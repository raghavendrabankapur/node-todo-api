const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

var app = express();
const port = process.env.PORT || 3000;

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
  Todo.findOne({ text: req.params.textValue })
    .then(
      todo => {
        if (!todo) {
          return res
            .status(404)
            .send(`Could not find the todo ${req.params.key}`);
        }
        res.send(todo);
      },
      e => {
        res.status(400).send(e);
      }
    )
    .catch(e => {});
});

app.get("/todos/id/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id)
    .then(
      todo => {
        if (!todo) {
          return res
            .status(404)
            .send(`Could not find the todo ${req.params.key}`);
        }
        res.send(todo);
      },
      e => {
        res.status(400).send(e);
      }
    )
    .catch(e => {
      res.status(400).send();
    });
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
      }
      res.send(todo);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.delete("/todos/id/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id, { passRawResult: true }).then(
    todo => {
      if (!todo) {
        return res
          .status(404)
          .send(`Could not find the todo ${req.params.key}`);
      }
      res.send(todo);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.patch("/todos/id/:id", (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);
  if (!ObjectID.isValid(id)) return res.status(404).send();

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(
    id,
    {
      $set: body
    },
    { new: true }
  )
    .then(todo => {
      if (!todo)
        return res.status(404).send(`Could not find the todo with id ${id}`);
      res.send(todo);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.patch("/todos/text/:textToUpdate", (req, res) => {
  var body = _.pick(req.body, ["text", "completed"]);

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(
    { text: req.params.textToUpdate },
    {
      $set: body
    },
    { new: true }
  )
    .then(todo => {
      if (!todo)
        return res.status(404).send(`Could not find the todo with id ${id}`);
      res.send(todo);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log(`started up at port ${port}`);
});

module.exports = { app };
