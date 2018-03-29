const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '5abd4bb8d093e766cd6bf56f'}).then((todo) => {
  
});

Todo.findByIdAndRemove('5abd4bb8d093e766cd6bf56f').then((todo) => {
  console.log(todo);
});
