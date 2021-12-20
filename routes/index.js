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

router.post('/travels', require_auth, travelsController.createTravel)
router.put('/travels', require_auth, travelsController.updateTravel)
router.get('/travels', require_auth, travelsController.getTravels)

module.exports = router;
