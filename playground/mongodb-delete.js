//const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/ToDoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to DB server");
  }
  console.log("Connected to MongoDB server");

  // deletemany
//   db.collection('Todos').deleteMany({
//       text:'eat lunch'
//   }).then(result=>{
//     console.log(result);
//   });

// deleteone
// db.collection('Todos').deleteOne({
//     text:'eat lunch'
// }).then(result=>{
//     console.log(result);
// })

//findoneanddelete
// db.collection('Todos').findOneAndDelete({
//     completed:false
// }).then(result=>{
//     console.log(result);
// });

// db.collection('Users').deleteMany({
//     name:'Padma'
// }).then(result=>{
//     console.log('Deleted documents');
// });

// db.collection('Users').find({
//     name:'Chaitra'
// }).toArray().then(doc=>{
//     var id = doc[0]._id;
//     db.collection('Users').findOneAndDelete({
//         _id : new ObjectID(id)
//     }).then(result =>{
//         console.log(result);
//     })
// }, err=>{
//     console.log(err);
// });

  //db.close();
});
