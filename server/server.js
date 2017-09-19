var express = require("express");
var bodyParser = require("body-parser");

var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completedAt
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos/text/:key", (req, res) => {
  Todo.findOne({ text: req.params.key }).then(
    todo => {
      if (todo === null) {
        res.status(404).send(`Could not find the todo ${req.params.key}`);
      } else {
        res.send(todo);
      }
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos/id/:key", (req, res) => {
  Todo.findById(req.params.key).then(
    todo => {
      if (todo === null) {
        res.status(404).send(`Could not find the todo ${req.params.key}`);
      } else {
        res.send(todo);
      }
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.delete("/todos/text/:key", (req, res) => {
  Todo.findOneAndRemove({ text: req.params.key }, { passRawResult: true }).then(
    todo => {
      if (todo === null) {
        return res
          .status(404)
          .send(`Could not find the todo ${req.params.key}`);
      } else {
        res.send(todo);
      }
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.delete("/todos/id/:key", (req, res) => {
  Todo.findByIdAndRemove(req.params.key, { passRawResult: true }).then(
    todo => {
      if (todo === null) {
        return res
          .status(404)
          .send(`Could not find the todo ${req.params.key}`);
      } else {
        res.send(todo);
      }
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.listen(3000, () => {
  console.log("Connected to app server at port 3000");
});

module.exports = { app };
