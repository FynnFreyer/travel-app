function authenticate(req, res, next) {
    if (!req.session || !req.session.clientId) {
        const err = new Error('Unauthorized')
        err.statusCode = 401
        next(err)
    }
    next()
}

module.exports = authenticate
