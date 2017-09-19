const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");

var id = "59c0c39649a82630c8162510";

Todo.find({
  _id: id
}).then(todos => {
  console.log("Todos", todos);
});

Todo.findOne({
  _id: id
}).then(todo => {
  console.log("Todo", todo);
});

Todo.findById(id).then(todo => {
    console.log("Todo by id", todo);
  });