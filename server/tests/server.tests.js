const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {mongose} = require('./../db/mongoose');

const todos = [{
  _id: new ObjectID(),
  text:"First todo"
},{
  _id: new ObjectID(),
  text:"Second todo",
  completed: true,
  completedAt: 1354
}];


beforeEach((done)=>{
  Todo.remove({})
  .then(()=>{
    return Todo.insertMany(todos);
  })
  .then(()=>done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
     var text = 'Test todo text';

     request(app)
       .post('/todos')
       .send({text})
       .expect(200)
       .expect((res) => {
         expect(res.body.text).toBe(text);
       })
       .end((err, res) => {
         if (err) {
           return done(err);
         }

         Todo.find({text}).then((todos) => {
           expect(todos.length).toBe(1);
           expect(todos[0].text).toBe(text);
           done();
         }).catch((e) => done(e));
       });
   });

   it('should not create todo with invalid body data', (done) => {
     request(app)
       .post('/todos')
       .send({})
       .expect(400)
       .end((err, res) => {
         if (err) {
           return done(err);
         }

         Todo.find().then((todos) => {
           expect(todos.length).toBe(2);
           done();
         }).catch((e) => done(e));
       });
   });
 });

 describe("GET /todos", ()=>{
   it("should get all todos",(done)=>{
     request(app)
     .get("/todos")
     .expect(200)
     .expect((res)=>{
       expect(res.body.todos.length).toBe(2);
     })
     .end(done);

     })
 })

describe("GET /todo/:id",()=>{
  it("should return todo doc",(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
  //  .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text);
    }).end(done);

  });

    it("should return 404 if not found",(done)=>{
      var newID = new ObjectID().toHexString()
      request(app)
      .get(`/todos/${newID}`)
      .expect(404).end(done());

    });

  it("should return 404 if non-object ids",(done)=>{
    request(app)
    .get(`/todos/123`)
    .expect(404).end(done());

  });

})


describe('DELETE /todos/:id',()=>{
  it('shoudl remove a todo',(done)=>{
    var hexID = todos[1]._id.toHexString()
    request(app)
    .delete(`/todos/${hexID}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo._id).toBe(hexID)
    }).end((err,res)=>{
      if(err){return done(err)}
      Todo.findById(hexID).then((todo)=>{
        expect(todo).toNotExist();
        done()
      }).catch((e)=>done(e))

    }
    )

  });
  it('should return 404 if not found',(done)=>{
    var newID = new ObjectID().toHexString();
    request(app)
    .delete(`/todos/${newID}`)
    .expect(404).end(done());
  });


});


describe('PATCH /todos/:id',()=>{

  it('shoudl update a todo',(done)=>{
    var hexID = todos[0]._id.toHexString()
    var text = "This should be the new text"
    request(app)
    .patch(`/todos/${hexID}`)
    .send({
      completed: true,
      text
    })
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(text)
      expect(res.body.todo.completed).toBe(true)
      expect(res.body.todo.completedAt).toBeA("number")
    }).end(done)

  });

  it('shoudl clear completedAt',(done)=>{
    var hexID = todos[1]._id.toHexString()
    var text = "This should be the new text for false"
    request(app)
    .patch(`/todos/${hexID}`)
    .send({
      completed: false,
      text
    })
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(text)
      expect(res.body.todo.completed).toBe(false)
      expect(res.body.todo.completedAt).toBe(null)
    }).end(done)

  });


});
