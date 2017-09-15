//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/ToDoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to DB server");
  }
  console.log("Connected to MongoDB server");

  //   db.listCollections().toArray((err, items) => {
  //     if (err) {
  //       return console.log("Could not insert Todo", err);
  //     }
  //     console.log(JSON.stringify(items, undefined, 2));
  //   });

  // db.collection("Todos").insertOne({
  //   text: "Something to do",
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log("Could not insert Todo", err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection("Users").insertOne({
  //   name: "Raghavendra",
  //   age: 30,
  //   location: "Tetra grand green apple apartment, Bangalore"
  // }, (err, result) => {
  //   if (err) {
  //     return console.log("Could not insert Todo", err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.close();
});
