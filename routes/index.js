const express = require('express');

const usersController = require('../controller/users')
const travelsController = require('../controller/travels')

const authenticate = require('../middleware/authenticate')
const logging = require('../middleware/logging')
const add_headers = require('../middleware/headers')

const router = express.Router();
router.use(add_headers)

router.post('/login', usersController.login)
router.delete('/login', authenticate, usersController.logout)

router.post('/users', usersController.createUser)
router.get('/users/:verification_token', usersController.verifyUser)
//router.get('/users', usersController.readUser)
//router.put('/users', authenticate, usersController.updateUser)
//router.delete('/users', authenticate, usersController.deleteUser)

router.post('/travels', authenticate, travelsController.createTravel)
router.get('/travels', authenticate, travelsController.getAllUserTravels)
router.post('/travels/:travel_id', authenticate, travelsController.shareTravel)
router.put('/travels/:travel_id', authenticate, travelsController.updateTravel)
router.delete('/travels/:travel_id', authenticate, travelsController.deleteTravel)

router.use(logging)

module.exports = router;
