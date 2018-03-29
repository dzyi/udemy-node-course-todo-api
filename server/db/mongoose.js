const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if (process.env.PORT) {
  mongoose.connect('mongodb://admin:9wkDd66b4xQ8)XQF8*@ds227459.mlab.com:27459/node-todo-api');
} else {
  mongoose.connect('mongodb://localhost:27017/TodoApp');
}


module.exports = {mongoose};
