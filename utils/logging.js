// TODO built something a little more sophisticated
//  (loglevel, different methods for different purposes etc.)
//  and maybe wrap it as a class. Is this even a Logger?
//  Maybe more of a responder

function respondWithErrorIfNotProd(res, e) {
    if (process.env.NODE_ENV !== 'production') {
        res.status(500).json({
            message: "failed with error",
            error: e
        })
    } else {
        res.status(500).json()
    }
}

module.exports = respondWithErrorIfNotProd