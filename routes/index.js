const express = require('express');

const usersController = require('../controller/users')
const travelsController = require('../controller/travels')

const authenticate = require('../middleware/authenticate')
const logging = require('../middleware/logging')


const router = express.Router();

router.post('/login', usersController.login)
//router.delete('/login', usersController.logout)

router.post('/users', usersController.createUser)
//router.get('/users', usersController.readUser)
//router.put('/users', authenticate, usersController.updateUser)
//router.delete('/users', authenticate, usersController.deleteUser)

router.post('/travels', authenticate, travelsController.createTravel)
router.get('/travels', authenticate, travelsController.getTravels)
router.put('/travels/:travel_id', authenticate, travelsController.updateTravel)
router.delete('/travels/:travel_id', authenticate, travelsController.deleteTravel)

router.use(logging)

module.exports = router;
