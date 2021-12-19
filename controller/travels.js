const travelsService = require('../service/travels')
const usersService = require('../service/users')
// TODO error handling and req validation?

class TravelsController {
    async createTravel(req, res) {
        console.log("received request: ", req.body)
        try {
            const {name, start, end, destination} = req.body
            const user_id = await usersService.getUserID(req.session.email)
            const travel_id = await travelsService.createTravel(name, start, end, destination)
            const success = await travelsService.associateTravel(user_id, travel_id)
            if (success) {
                res.status(201).json({"travel_id": travel_id, "user_id": user_id})
                console.log("created travel: ", travel_id)
            } else {
                throw new Error(`from request: ${req.body}`)
            }
        } catch (e) {
            console.log(e)
            // TODO remove error
            res.status(500).json(`failed to create travel ${e}`)
            console.log("failed to create a travel from request: ", req.body)
        }
    }

    async updateTravel(req, res) {
        console.log("received request: ", req.body)
        try {
            if (req.body.hasAttribute('name')) {
                const {name} = req.body
                const id = travelsService.getTravelID(name)
            } else if (req.body.hasAttribute('id')) {
                const {id} = req.body
            } else {
                throw new Error('malformed request')
            }
            for (const key in req.body) {
                if (!['name', 'start', 'end', 'destination'].includes(key)) {
                    console.log('warning, skipping update of illegal key: ', key)
                    continue
                }

                travelsService.updateTravel(id, key, req.body[key])
            }

            const {id} = req.body
        } catch (e) {
            console.log(e)
            // TODO remove error
            res.status(500).json(`failed to update travel ${e}`)
            console.log("failed to update a travel from request: ", req.body)
        }
    }
}

module.exports = new TravelsController()
