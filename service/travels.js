const db = require('../store/db')

class TravelsService {
    async createTravel(name, start, end, destination) {
        const [id] = await db('travels').insert({
            name: name,
            start: start,
            end: end,
            destination: destination
        }).returning('id')

        return id
    }

    async associateTravel(user_id, travel_id) {
        try {
            await db('travels_made_by').insert({
                user_id: user_id,
                travel_id: travel_id
            })
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
}

module.exports = new TravelsService()
