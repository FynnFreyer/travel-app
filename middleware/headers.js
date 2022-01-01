function add_headers(req, res, next) {
    // obfuscate the technology we're using
    res.removeHeader('X-Powered-By')
    res.setHeader('Content-Type', 'application/json')
    // "A man is not dead while his name is still spoken."
    // http://www.gnuterrypratchett.com/
    res.setHeader('X-Clacks-Overhead', 'GNU Terry Pratchett')
    next()
}

module.exports = add_headers
