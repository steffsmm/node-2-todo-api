var express    = require('express')
var bodyParser = require('body-parser')
var app = express()

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
const {ObjectID} = require('mongodb')


const port = process.env.PORT || 3000;
//app.use(require('connect').bodyParser.json());

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
    res.status(404).send({todo});

  }).catch((e)=>res.status(404).send(e))

})

app.listen(port, ()=>{
  console.log(`Started on port ${port}`);
})

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
