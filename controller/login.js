const authService = require('../service/auth')
const crypto = require('crypto')

class LoginController {
    async login(req, res) {
        console.log("received request: ", req.body)
        try {
            const {email, password} = req.body
            const legit = await authService.checkCredentials(email, password)
            if (legit) {
                res.session.clientId = crypto.randomBytes(2048).toString('base64')
                res.status(201)
                console.log("authenticated user: ", email)
            } else {
                res.status(401)
            }
        } catch (e) {
            console.log(e)
            res.status(500)
            console.log("failed to authenticate a user from request: ", req.body)
        }
    }
}

module.exports = new LoginController()
