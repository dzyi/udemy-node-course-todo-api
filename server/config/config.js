var env = process.env.NODE_ENV || 'development';

// Override Heroku, does this work?
process.env.MONGODB_URI = 'mongodb://admin:9wkDd66b4xQ8)XQF8*@ds227459.mlab.com:27459/node-todo-api';
if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
