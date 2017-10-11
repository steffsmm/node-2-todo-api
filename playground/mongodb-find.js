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
 //   db.collection('Todos').find({
 //     _id: new ObjectID('59dde92dc9b04e9b0c0297ef')
 // }).toArray().then((docs)=>{
 //     console.log('Todos');
 //     console.log(JSON.stringify(docs, undefined,2));
 //   },(err)=>{
 //     if (err){
 //       console.log('Unable to fetch todos', err);
 //     }
 //   })


  //  db.collection('Todos').find().count().then((count)=>{
  //    console.log(`Todos count: ${count}`);
  //  },(err)=>{
  //    if (err){
  //      console.log('Unable to fetch todos', err);
  //    }
  //  })

    db.collection('Users').find({name: 'Stefani'}).toArray().then((docs)=>{
      console.log('Users');
      console.log(JSON.stringify(docs, undefined,2));
    },(err)=>{
      if (err){
        console.log('Unable to fetch todos', err);
      }
    })

  //db.close()
});
