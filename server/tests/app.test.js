const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../app');
const { Todo } = require('./../todo/todoModel');

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
  },
  {
    _id: new ObjectID(),
    text: 'Third test todo'
  }
]

beforeEach(done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

// POST /API/TODOS
describe('POST /api/todos', () => {
  it('should create a new todo', done => {
    const text = 'Test todo text';

    request(app)
      .post('/api/todos')
      .send({text})
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);  
        }

        Todo.find({text}).then(todos => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(err => done(err));
      });
  });

  it('should not create todo with invalid body data', done => {
    request(app)
      .post('/api/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find().then(todos => {
          expect(todos.length).toBe(3);
          done();
        }).catch(e => done(e));
      });
  });
});

// GET /API/TODOS
describe('GET /api/todos', () => {
  it('should fetch all todos', done => {
    request(app)
      .get('/api/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(3);
      })
      .end(done);
  });
});

// GET /API/TODOS/:ID
describe('GET /api/todos/:id', () => {

  it('should return 400 if ObjectID is invalid', done => {
    const invalidId = '123abc';

    request(app)
      .get(`/api/todos/${invalidId}`)
      .expect(400)
      .end(done);
  });

  it('should return a valid todo', done => {
    request(app)
      .get(`/api/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done);
  });

  it('should return 404 if todo not found', done => {
    const validId = new ObjectID().toHexString();

    request(app)
    .get(`/api/todos/${validId}`)
    .expect(404)
    .end(done);
  });
});

// DELETE /API/TODOS/:ID
describe('DELETE /api/todos/:id', () => {
  it('should return 400 if ObjectID is invalid', done => {
    const invalidId = '123abc';

    request(app)
      .delete(`/api/todos/${invalidId}`)
      .expect(400)
      .end(done);
  });

  it('should remove a todo', done => {
    const todoId = todos[0]._id.toHexString();
    request(app)
      .delete(`/api/todos/${todoId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.deletedTodo._id).toBe(todoId);
      })
      .end((error, response) => {
        if(error) {
          return done(error);
        }
        // Query database to confirm that todo is actually deleted
        Todo.findById(todoId).then(todo => {
          expect(todo).toNotExist();
          done();
        }).catch(err => done(err));
      });
  });

  it('should return 404 if todo not found', done => {
    const validId = new ObjectID().toHexString();

    request(app)
    .delete(`/api/todos/${validId}`)
    .expect(404)
    .end(done);
  });
});

describe('PATCH /api/todos/:id', () => {
  it('should update a todo', done => {
    const firstTodoId = todos[0]._id.toHexString();
    const updatedTodo = {
      text: 'Updated first',
      completed: true
    }
    request(app)
      .patch(`/api/todos/${firstTodoId}`)
      .send(updatedTodo)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(updatedTodo.text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', done => {
    const secondTodoId = todos[1]._id.toHexString();
    const updatedTodo = {
      text: 'Updated second',
      completed: false
    }
    request(app)
      .patch(`/api/todos/${secondTodoId}`)
      .send(updatedTodo)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(updatedTodo.text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });
});