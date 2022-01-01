function add_headers(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    // "A man is not dead while his name is still spoken."
    // http://www.gnuterrypratchett.com/
    res.setHeader('X-Clacks-Overhead', 'GNU Terry Pratchett')
    next()
}

module.exports = add_headers
