const travelsService = require('../service/travels')
// TODO error handling and req validation?

class TravelsController {
    async createTravel(req, res) {
        console.log("received request: ", req.body)
        try {
            const {email, salt, pw_hash} = req.body
            const id = await travelsService.createTravel(email, salt, pw_hash)
            res.status(201).json(id)
            console.log("created user: ", id)
        } catch (e) {
            console.log(e)
            // TODO remove error
            res.status(500).json(`failed to create travel ${e}`)
            console.log("failed to create a travel from request: ", req.body)
        }
    }
}

module.exports = new TravelsController()
