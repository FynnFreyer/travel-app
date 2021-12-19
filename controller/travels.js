const travelsService = require('../service/travels')
// TODO error handling and req validation?

class TravelsController {
    async createTravel(req, res) {
        console.log("received request: ", req.body)
        try {
            const {name, start, end, destination} = req.body
            // TODO check logged in and get real user_id
            // req.session.email
            const user_id = 1
            const travel_id = await travelsService.createTravel(name, start, end, destination)
            const success = await travelsService.associateTravel(user_id, travel_id)
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
