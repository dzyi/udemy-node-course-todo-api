const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// var id = '5abb6b089daa75709a47121c11';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }
//
//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by Id', todo);
// }).catch((e) => console.log(e));

// User.findById

// User not found
// User found
// Any errors
var id = '5abaaf8c313e4db7829c26f1';

User.findById(id).then((user) => {
  if(!user) {
    return console.log('Unable to find user');
  }
  console.log('User by Id', user);
}).catch((e) => console.log(e));
