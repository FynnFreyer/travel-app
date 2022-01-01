const usersService = require('../service/users')
const crypto = require("crypto");

// TODO error handling and req validation?

class UsersController {
    async createUser(req, res) {
        try {
            const {email, password} = req.body
            const id = await usersService.createUser(email, password)
            res.status(201).json(id)
        } catch (e) {
            res.status(400).json('Bad request')
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const legit = await usersService.checkCredentials(email, password)
            if (legit) {
                //console.log(req.session)
                req.session.clientId = crypto.randomBytes(2048).toString('hex')
                req.session.email = email
                req.session.user_id = await usersService.getUserID(email)
                res.status(200).json('OK')
            } else {
                res.status(401).json('Unauthorized')
            }
        } catch (e) {
            res.status(400).json('Bad request')
        }
    }

    async logout(req, res) {
        req.session.destroy()
        res.status(200).json('OK')
    }
}

module.exports = new UsersController()
