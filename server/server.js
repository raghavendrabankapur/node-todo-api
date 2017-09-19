var express = require("express");
var bodyParser = require("body-parser");
var { ObjectID } = require("mongodb");

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

app.get("/todos/text/:textValue", (req, res) => {
  Todo.findOne({ text: req.params.textValue }).then(
    todo => {
      if (!todo) {
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

app.get("/todos/id/:id", (req, res) => {
  var id = req.params.id;
  if (ObjectID.isValid(id)) {
    Todo.findById(req.params.id).then(
      todo => {
        if (!todo) {
          res.status(404).send(`Could not find the todo ${req.params.key}`);
        } else {
          res.send(todo);
        }
      },
      e => {
        res.status(400).send(e);
      }
    );
  } else {
    res.status(404).send();
  }
});

app.delete("/todos/text/:textValue", (req, res) => {
  Todo.findOneAndRemove(
    { text: req.params.textValue },
    { passRawResult: true }
  ).then(
    todo => {
      if (!todo) {
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

app.delete("/todos/id/:id", (req, res) => {
  var id = req.params.id;
  if (ObjectID.isValid(id)) {
    Todo.findByIdAndRemove(req.params.id, { passRawResult: true }).then(
      todo => {
        if (!todo) {
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
  } else {
    res.status(404).send();
  }
});

app.listen(3000, () => {
  console.log("Connected to app server at port 3000");
});

module.exports = { app };
