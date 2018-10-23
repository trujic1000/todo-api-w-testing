const expect = require('expect');
const request = require('supertest');

const { app } = require('./../app');
const { Todo } = require('./../todo/todoModel');

const todos = [
  {
    text: 'First test todo'
  },
  {
    text: 'Second test todo'
  },
  {
    text: 'Third test todo'
  }
]

beforeEach(done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

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