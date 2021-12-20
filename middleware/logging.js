// TODO built something a little more sophisticated
//  (loglevel, different error middlewares for different purposes etc.)

function propagateError(err, req, res, next) {
    console.log('application error occured: ', err)
    if (process.env.NODE_ENV !== 'production') {
        res.status(err.statusCode || 500).json({
            message: "failed with error",
            error: err
        })
    } else {
        res.status(err.statusCode || 500).json(err.message)
    }
    next()
}

module.exports = propagateError
