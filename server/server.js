const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/ToDoApp");

var Todo = mongoose.model("Todo", {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

var newTodo = new Todo({
  text: 256489,
  completed: '',
  completedAt: 123
});

newTodo.save().then(
  doc => {
    console.log("Saved todo", doc);
  },
  e => {
    console.log("Not able to save todo", e);
  }
);

// The properties as typesafe. When invalid type is passed, eg, completed which expect bool and when passed a string,
// it checked as if the input is null or empty and set to bool accordingly.
