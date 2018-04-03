require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

const port = process.env.PORT;
var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }).catch((e) => {
    res.sendStatus(400).send();
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

  if (!ObjectID.isValid(id)) {
    return res.sendStatus(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.sendStatus(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.sendStatus(404).send()
  })
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.sendStatus(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.sendStatus(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.sendStatus(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;

  // Because we only want to pick the following options that the
  // user updated
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.sendStatus(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.sendStatus(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.sendStatus(400).send();
  });
});

// POST to /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.sendStatus(400).send();
  })
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.sendStatus(400).send();
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = {app};
