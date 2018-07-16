const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const tasks = require('./route/tasks');
const auth = require('./route/auth');
const users = require('./route/users');
const boards = require('./route/boards');
const verifytoken = require('./api/servces/verifytoken');

app.use(cors());
app.use(verifytoken);
app.use(passport.initialize());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(auth);
app.use(tasks);
app.use(users);
app.use(boards);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});