const travelsService = require('../service/travels')
const usersService = require('../service/users')
const  respondWithErrorIfNotProd = require('../middleware/logging')
// TODO error handling and req validation?

class TravelsController {
    async createTravel(req, res) {
        try {
            const {name, start, end, destination} = req.body
            const user_id = await usersService.getUserID(req.session.email)
            const travel_id = await travelsService.createTravel(name, start, end, destination)
            const success = await travelsService.associateTravel(user_id, travel_id)
            if (success) {
                res.status(201).json({"travel_id": travel_id, "user_id": user_id})
                console.log("created travel: ", travel_id)
            } else {
                // TODO clean up the created travel?
                res.status(500).json('Failed to associate user and travel')
            }
        } catch (e) {
            res.status(400).json('Bad request')
        }
    }

    async shareTravel(req, res) {
        let travel_id_string = req.params.travel_id
        let travel_id = parseInt(travel_id_string, 10)
        let user_id = req.session.user_id
        try {
            let travel_ids = await travelsService.getTravelIDsOfUser(user_id)
            const {email} = req.body
            let shared_user = await usersService.getUserID(email)
            if (travel_ids.includes(travel_id)) {
                const success = await travelsService.associateTravel(shared_user, travel_id)
                if (success) {
                    res.status(200).json('OK')
                } else {
                    res.status(400).json('Bad request')
                }
            } else {
                res.status(401).json('Unauthorized')
            }
        } catch (e) {
            res.status(400).json('Bad request')
        }
    }

    async updateTravel(req, res) {
        let travel_id_string = req.params.travel_id
        let travel_id = parseInt(travel_id_string, 10)
        let user_id = req.session.user_id
        try {
            let travel_ids = await travelsService.getTravelIDsOfUser(user_id)
            if (travel_ids.includes(travel_id)) {
                for (const key in req.body) {
                    if (!['name', 'start', 'end', 'destination'].includes(key)) {
                        continue
                    }
                    await travelsService.updateTravel(travel_id, key, req.body[key])
                }
                res.status(200).json('OK')
            } else {
                res.status(401).json('Unauthorized')
            }
        } catch (e) {
            res.status(400).json('Bad request')
        }
    }

    async getAllUserTravels(req, res) {
        try {
            const travels = await travelsService.getAllUserTravels(req.session.user_id)
            res.status(200).json(travels)
        } catch (e) {
            res.status(400).json('Bad request')
        }
    }

    async deleteTravel(req, res) {
        let travel_id_string = req.params.travel_id
        let travel_id = parseInt(travel_id_string, 10)
        let user_id = req.session.user_id
        try {
            let travel_ids = await travelsService.getTravelIDsOfUser(user_id)
            if (travel_ids.includes(travel_id)) {
                await travelsService.deleteTravel(travel_id)
                res.status(200).json('OK')
            } else {
                res.status(401).json('Unauthorized')
            }
        } catch (e) {
            res.status(400).json('Bad request')
        }
    }
}

module.exports = new TravelsController()
