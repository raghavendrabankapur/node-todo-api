//const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/ToDoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to DB server");
  }
  console.log("Connected to MongoDB server");

  //   db
  //     .collection("Todos")
  //     .find({
  //       _id: new ObjectID('59ba64c80f56333320cbee6b')
  //     })
  //     .toArray()
  //     .then(
  //       docs => {
  //         console.log("Todos");
  //         console.log(JSON.stringify(docs, undefined, 2));
  //       },
  //       err => {
  //         console.log("Unable to fetch", err);
  //       }
  //     );

  // db
  //   .collection("Todos")
  //   .find()
  //   .count()
  //   .then(
  //     count => {
  //       console.log(`Todos count: ${count}`);
  //     },
  //     err => {
  //       console.log("Unable to fetch", err);
  //     }
  //   );

  db
    .collection("Users")
    .find({
      location: "Bangalore"
    })
    .toArray()
    .then(
      docs => {
        console.log("Users");
        console.log(JSON.stringify(docs, undefined, 2));
      },
      err => {
        console.log("Unable to fetch", err);
      }
    );
  db
    .collection("Users")
    .find({
      location: "Bangalore"
    })
    .count()
    .then(
      count => {
        console.log(`Users count: ${count}`);
      },
      err => {
        console.log("Unable to fetch", err);
      }
    );

  //db.close();
});
