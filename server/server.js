var express    = require('express')
var bodyParser = require('body-parser')
var app = express()

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
// parse application/json
//app.use(bodyParser.raw({ type: 'text/xml' }));

app.use(bodyParser.json())

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


//app.use(require('connect').bodyParser.json());

app.post('/todos',(req, res)=>{
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  })
})

app.listen(3000, ()=>{
  console.log('Started on port 3000');
})













// var newTodo = new Todo({
//   text: "Cook dinner"
// });
// newTodo.save().then((doc)=>{
// console.log("Saved todo", doc);
// },(e)=>{
//   console.log("Unable to save todo");
// })


// var otherTodo = new Todo({
//   text: "Eat dinner",
//   completed: false,
//   completedAt: 33
// });

// var otherTodo = new Todo({
//   text: "Go to sleep"
// });
// otherTodo.save().then((doc)=>{
// console.log("Saved todo", doc);
// },(e)=>{
//   console.log("Unable to save todo");
// })



//
// var newUser = new User({
//   email: " new email"
// });
// newUser.save().then((doc)=>{
// console.log("Saved user", doc);
// },(e)=>{
//   console.log("Unable to save user");
// })
