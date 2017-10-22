const {ObjectID} = require('mongodb')

const {mongose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
// console.log(result);
//
// })

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findByIdAndRemove("59ecc646876eb06361cdf372").then((todo)=>{
  console.log(todo);
})
