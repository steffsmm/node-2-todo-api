require('./config/config');

const _ = require('lodash');
const express    = require('express')
const bodyParser = require('body-parser')
const app = express()


//node-todo-api-database
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
// parse application/json
//app.use(bodyParser.raw({ type: 'text/xml' }));

app.use(bodyParser.json())

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');
var {authenticate} = require("./middlewhere/authenticate");

const port = process.env.PORT || 3000;
//app.use(require('connect').bodyParser.json());
//console.log(port);

app.post('/todos',(req, res)=>{
  //console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  })
})

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos})
  },
  (e)=>{
    res.status(400).send(e);
  })
})

app.get("/todos/:id",(req,res)=>{
  var id = req.params.id
  if (!ObjectID.isValid(id)){
    console.log("ID not valid");
    res.status(404).send("ID not valid")
  }
  Todo.findById(id).then((todo)=>{
    if (!todo){return console.log("ID not found");}
    res.status(200).send({todo});

  }).catch((e)=>res.status(404).send(e))

})

app.delete("/Todos/:id",(req,res)=>{
  var id = req.params.id
  if (!ObjectID.isValid(id)){
    return res.status(404)
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if (!todo){return res.status(404).send()}
    res.status(200).send({todo});

  }).catch((e)=>res.status(400).send(e))

})

app.patch("/Todos/:id",(req,res)=>{
  var id = req.params.id
  var body = _.pick(req.body,["text","completed"])
  if (!ObjectID.isValid(id)){
    return res.status(404)
  }
  if (_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((todo)=>{
    if (!todo){return res.status(404).send()}
    res.send({todo});

  }).catch((e)=>res.status(400).send())

})


app.post('/users',(req, res)=>{
  var body = _.pick(req.body,["email","password"]);
  var user = new User(body);
  console.log(user);
  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header("x-auth", token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  })
});


app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});

module.exports = {app};











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

//mongodb://Steffsmm:Smm1694@ds127065.mlab.com:27065/node-todo-api-database
//"test": "nodemon --exec \"mocha server/**/*.tests.js\""
