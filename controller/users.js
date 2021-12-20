const usersService = require('../service/users')
const crypto = require("crypto");
const  respondWithErrorIfNotProd = require('../utils/logging')

// TODO error handling and req validation?

class UsersController {
    async createUser(req, res) {
        console.log("received request: ", req.body)
        try {
            const {email, password} = req.body
            const id = await usersService.createUser(email, password)
            res.status(201).json(id)
            console.log("created user: ", id)
        } catch (e) {
            console.log(e)
            respondWithErrorIfNotProd(res, e)
            console.log("failed to create a user from request: ", req.body)
        }
    }

    async login(req, res) {
        console.log("received request: ", req.body)
        try {
            const {email, password} = req.body
            const legit = await usersService.checkCredentials(email, password)
            if (legit) {
                //console.log(req.session)
                req.session.clientId = crypto.randomBytes(2048).toString('hex')
                req.session.email = email
                req.session.user_id = await usersService.getUserID(email)
                res.status(200).json()
                console.log("authenticated user: ", email)
            } else {
                res.status(401).json()
            }
        } catch (e) {
            console.log(e)
            respondWithErrorIfNotProd(res, e)
            console.log("failed to authenticate a user from request: ", req.body)
        }
    }
}

module.exports = new UsersController()
