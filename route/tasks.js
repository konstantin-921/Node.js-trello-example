const express = require('express');
const router = module.exports = express.Router();
const Controllers = require('../controller/tasks');

router.get('/tasks', Controllers.getTasks);

router.post('/tasks', Controllers.createTasks);

router.delete('/tasks', Controllers.deleteTask);

router.put('/tasks', Controllers.moveTask);