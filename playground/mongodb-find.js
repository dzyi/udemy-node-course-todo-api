const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  db.collection('Todos').find({
    _id: new ObjectID('5ab8e260d681a3cd40e54c36'),
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err, result) => {
    if (err) {
      return console.log('Unable to fetch todos', err);
    }
  });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to fetch todos', err);
  //   }
  // });

  db.collection('Users').find({name: 'Mårten'}).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err, result) => {
    if (err) {
      return console.log('Unable to fetch users', err);
    }
  });

  //client.close();
});
