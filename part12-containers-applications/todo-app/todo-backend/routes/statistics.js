const express = require('express');
const { getAsync } = require('../redis');
const router = express.Router();

router.get('/', async (_, res) => {
  const added_todos = Number(await getAsync('added_todos')) || 0
  console.log('added todos from statistics')
  console.log(added_todos)
  res.send({
    "added_todos": added_todos
  });
});

module.exports = router;
