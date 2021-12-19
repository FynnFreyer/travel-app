const usersService = require('../service/users')
// TODO error handling and req validation?

class UsersController {
    async createUser(req, res) {
        console.log("received request: ", req.body)
        try {
            const {email, salt, pw_hash} = req.body
            const id = await usersService.createUser(email, salt, pw_hash)
            res.status(201).json(id)
            console.log("created user: ", id)
        } catch (e) {
            console.log(e)
            res.status(500)
            console.log("failed to create a user from request: ", req.body)
        }
    }
}

module.exports = new UsersController()
