const express = require('express');
const router = module.exports = express.Router();
const Controllers = require('../controller/boards');

router.get('/boards', Controllers.getBoards);

router.post('/boards', Controllers.createNewBoard);

router.delete('/boards', Controllers.deleteBoard);

router.put('/boards', Controllers.shareBoard);