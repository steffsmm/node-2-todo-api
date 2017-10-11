// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();

var user = {name: 'stefani',age:25}
var {name} = user;
console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to Mongo DB');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err,result)=>{
  //   if(err){
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2));
  //   console.log(JSON.stringify(result,undefined,2));
  // })

  // db.collection('Users').insertOne({
  //   name: 'Stefani',
  //   age: 23,
  //   location: 'Sofia, Bulgaria'
  // }, (err,result)=>{
  //   if(err){
  //     return console.log('Unable to insert users', err);
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // })

  db.close()
});
