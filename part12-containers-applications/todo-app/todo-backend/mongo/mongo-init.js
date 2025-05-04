db.createUser({
  user: 'duongtrick1',
  pwd: '0989542210',
  roles: [
    {
      role: 'dbOwner',
      db: 'todos',
    },
  ],
});

db.createCollection('todos');

db.todos.insert({ text: 'Write code', done: true });
db.todos.insert({ text: 'Learn about containers', done: false });