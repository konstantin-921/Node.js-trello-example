const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const tasks = require('./route/tusks');

app.use(cors());
app.use(passport.initialize());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(tasks);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});