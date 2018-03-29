var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.sendStatus(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.sendStatus(400).send(e);
  });
});

// GET /todos/12345
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  // Valid id using ObjectID
    // 404 - send back empty body
  if (!ObjectID.isValid(id)) {
    return res.sendStatus(404).send();
  }

  // findById - todos
    // success
      // if todo - send it back
      // if no todo - send back 400 - empty body
    // error
      // 400, and send empty body back
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.sendStatus(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.sendStatus(404).send()
  })
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = {app};
