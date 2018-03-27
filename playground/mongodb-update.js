const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5aba1a1fabc44c44f3dcdd8f')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });


  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5aba0a02031ffe571c819a38')
  }, {
    $set: { name: 'Mårten' },
    $inc: { age: -2}
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });






  //client.close();
});
