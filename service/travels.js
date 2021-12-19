const db = require('../store/db')

class TravelsService {
    async createTravel(name, start, end, destination) {
        const [id] = await db
            .insert({
                name: name,
                start: start,
                end: end,
                destination: destination
            })
            .into('travels')
            .returning('id')

        return id
    }

    async associateTravel(user_id, travel_id) {
        try {
            await db
                .insert({
                    user_id: user_id,
                    travel_id: travel_id
                })
                .into('travels_made_by')
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    async updateTravel(travel_id, key, value) {
        const [id] = await db('travels')
            .where('id', travel_id)
            .update(key, value, 'id')

        return id
    }

    async getTravelID(name) {
        return await db
            .select('id')
            .from('travels')
            .where('name', name)
            .then((travels) => {
                let travel = travels[0]
                const {id} = travel
                return id
            })
    }
}

module.exports = new TravelsService()
