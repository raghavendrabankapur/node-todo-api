const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/ToDoApp");

// var Todo = mongoose.model("Todo", {
//   text: {
//     type: String,
//     required: true,
//     minLength: 1,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }
// });

// var newTodo = new Todo();

// newTodo.save().then(
//   doc => {
//     console.log("Saved todo", doc);
//   },
//   e => {
//     console.log("Not able to save todo", e);
//   }
// );

var Todo = mongoose.model("Users", {
    email: {
      type: String,
      required: true,
      minLength: 1,
      trim: true
    }
  });
  
  var newTodo = new Todo({
      email:'test@test.com'
  });
  
  newTodo.save().then(
    doc => {
      console.log("Saved users", doc);
    },
    e => {
      console.log("Not able to save user", e);
    }
  );


// User email - require, trim, type as string, set min 