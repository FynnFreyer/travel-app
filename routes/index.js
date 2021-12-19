const express = require('express');
const loginController = require('../controller/login')
const usersController = require('../controller/users')
const travelsController = require('../controller/travels')

const router = express.Router();

router.post('/login', loginController.login)
router.post('/users', usersController.createUser)
router.post('/travels', travelsController.createTravel)

module.exports = router;
