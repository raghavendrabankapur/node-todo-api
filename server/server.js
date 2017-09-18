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
  text: "Go to office",
  completed:false,
  completedAt:123
});

newTodo.save().then(
  doc => {
    console.log("Saved todo", doc);
  },
  e => {
    console.log("Not able to save todo");
  }
);
