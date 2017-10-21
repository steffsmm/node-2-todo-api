const {ObjectID} = require('mongodb')

const {mongose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//59eb45be727e96ac2c21aa5e
var id = "59de35d44fd212e021a2835b"

User.findById(id).then((user)=>{
  if (!user){return console.log("User not found");}
  console.log("User by id",user);
}).catch((e)=>console.log(e))



// if (!ObjectID.isValid(id)){
//   console.log("ID not valid");
// }

//
// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log("Todos",todos);
// })
//
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log("Todo",todo);
// })
//
// Todo.findById(id).then((todo)=>{
//   if (!todo){return console.log("ID not found");}
//   console.log("Todo by id",todo);
// }).catch((e)=>console.log(e))
