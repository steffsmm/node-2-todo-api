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
//deleteMany
// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result)=>{
//   console.log(result);
// })
//deleteOne
// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result)=>{
//   console.log(result);
// })

//findOneAndDelete
// db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
//   console.log(result);
// })

// db.collection('Users').deleteMany({name: 'Stefani'}).then((result)=>{
//   console.log(result);
// })
//"_id" : ObjectId("59dddfbba8dbf62c04aedfe5")
db.collection('Users').findOneAndDelete({
      _id: new ObjectID('59ddee21c9b04e9b0c029997')
  }).then((docs)=>{
      console.log(JSON.stringify(docs, undefined,2));
    })

  //db.close()
});
