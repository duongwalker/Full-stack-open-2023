const express = require('express');
const { Todo } = require('../mongo')
const { setAsync, getAsync } = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const current = await getAsync('added_todos') || 0;
  console.log('current' + current)
  res.send(todo);
  setAsync('added_todos', Number(current)+1)
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;

  req.todo.text = text ?? req.todo.text;
  req.todo.done = typeof done === 'boolean' ? done : req.todo.done;

  const updated = await req.todo.save();
  res.json(updated);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
