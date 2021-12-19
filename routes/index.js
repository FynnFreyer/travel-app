const express = require('express');
const usersController = require('../controller/users')
const travelsController = require('../controller/travels')

const router = express.Router();

router.post('/login', usersController.login)
router.post('/users', usersController.createUser)
router.post('/travels', travelsController.createTravel)

module.exports = router;
