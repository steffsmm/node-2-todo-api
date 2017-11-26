
const {ObjectID} = require('mongodb');
const {mongose} = require('./../../db/mongoose');
const {Todo} = require('./../../models/todo');

const todos = [{
  _id: new ObjectID(),
  text:"First todo"
},{
  _id: new ObjectID(),
  text:"Second todo",
  completed: true,
  completedAt: 1354
}];

const populateTodos = (done)=>{
  Todo.remove({})
  .then(()=>{
    return Todo.insertMany(todos);
  })
  .then(()=>done());
}

module.export = {todos,populateTodos};
