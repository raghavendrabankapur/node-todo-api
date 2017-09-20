const request = require("supertest");
const expect = require("expect");

const { app } = require("../server");
const { Todo } = require("../models/todo");

const todos = [
  {
    text: "First test todo"
  },
  {
    text: "Second test todo"
  }
];

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => {
      done();
    });
});

describe("POST /todos", () => {
  it("should create a new todo", done => {
    var text = "Test todo text";

    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
        expect(res.body.completed).toBe(false);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => {
            done(e);
          });
      });
  });

  it("should create a new todo with completed as true", done => {
    var text = "Test todo text";
    var obj = { text: text, completed: true };

    request(app)
      .post("/todos")
      .send(obj)
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
        expect(res.body.completed).toBe(true);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => {
            done(e);
          });
      });
  });

  it("should not create todo with invalid body data", done => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(e => {
            done(e);
          });
      });
  });
});

describe("GET /todos/{text/id}/:key", () => {
  it("shoulg get single todo", done => {
    request(app)
      .get("/todos/text/First test todo")
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe("First test todo");
      })
      .end(done);
  });

  it("shoulg get single todo by id", done => {
    var text = "Test todo text";
    var id = "";

    var agent = request(app);

    agent
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        id = res.body._id;
      })
      .end(() => {
        agent
          .get(`/todos/id/${id}`)
          .send()
          .expect(200)
          .expect(res => {
            expect(res.body.text).toBe(text);
          })
          .end(done);
      });
  });

  it("shoult get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });

  it('should return 404 when invalid id',(done)=>{
    request(app)
    .get("/todos/id/123")
    .expect(404)
    .end(done);
  })

  it('should return 404 when invalid text',(done)=>{
    request(app)
    .get("/todos/text/123")
    .expect(404)
    .end(done);
  })
});

describe('DELETE /todos/{text/id}/:key',()=>{
  it("shoulg delete single todo", done => {
    request(app)
      .delete("/todos/text/First test todo")
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe("First test todo");
      })
      .end(done);
  });

  it('should delete single todo with id',done=>{
    var text = "Test todo text";
    var id = "";

    var agent = request(app);

    agent
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        id = res.body._id;
      })
      .end(() => {
        agent
          .delete(`/todos/id/${id}`)
          .send()
          .expect(200)
          .expect(res => {
            expect(res.body.text).toBe(text);
          })
          .end(done);
      });
  })
})
