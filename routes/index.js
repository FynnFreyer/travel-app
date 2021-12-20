const express = require('express');
const usersController = require('../controller/users')
const travelsController = require('../controller/travels')

const require_auth = (req, res, next) => {
    if (!req.session || !req.session.clientId) {
        const err = new Error('not authorized')
        err.statusCode = 401
        next(err)
    }
    next()
}

const router = express.Router();

router.post('/login', usersController.login)

router.post('/users', usersController.createUser)
router.delete('/users', require_auth, usersController.createUser)

router.post('/travels', require_auth, travelsController.createTravel)
router.get('/travels', require_auth, travelsController.getTravels)
router.put('/travels/:travel_id', require_auth, travelsController.updateTravel)
router.delete('/travels/:travel_id', require_auth, travelsController.deleteTravel)

module.exports = router;
