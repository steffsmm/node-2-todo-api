var env = process.env.NODE_ENV || "development";
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


if (env == "development"){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
  console.log("MONGODB_URI ***** ", process.env.MONGODB_URI);
}else {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
  console.log("MONGODB_URI ***** ", process.env.MONGODB_URI);
}
