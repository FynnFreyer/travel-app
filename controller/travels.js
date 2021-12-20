const travelsService = require('../service/travels')
const usersService = require('../service/users')
const  respondWithErrorIfNotProd = require('../utils/logging')
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
            respondWithErrorIfNotProd(res, e)
            console.log("failed to create a travel from request: ", req.body)
        }
    }

    async updateTravel(req, res) {
        console.log("received request: ", req.body)
        let travel_id = req.params.travel_id
        try {
            for (const key in req.body) {
                if (!['name', 'start', 'end', 'destination'].includes(key)) {
                    console.log('warning, skipping update of illegal key: ', key)
                    continue
                }

                await travelsService.updateTravel(travel_id, key, req.body[key])
            }
        } catch (e) {
            console.log(e)
            respondWithErrorIfNotProd(res, e)
            console.log("failed to update a travel from request: ", req.body)
        }
    }

    async getTravels(req, res) {
        console.log("received request: ", req.body)
        try {
            const travels = await travelsService.getTravels(req.session.user_id)
            res.status(200).json(travels)
            console.log("returned travels: ", travels)
        } catch (e) {
            console.log(e)
            respondWithErrorIfNotProd(res, e)
            console.log("failed to update a travel from request: ", req.body)
        }
    }

    async deleteTravel(req, res) {
        console.log("received request: ", req.body)
        let travel_id = req.params.travel_id
        try {
            await travelsService.deleteTravel(travel_id)
            res.status(200).json(travel_id)
        } catch (e) {
            console.log(e)
            respondWithErrorIfNotProd(res, e)
            console.log("failed to delete a travel from request: ", req.body)
        }
    }
}

module.exports = new TravelsController()
