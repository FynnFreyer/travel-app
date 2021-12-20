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

    async deleteTravel(travel_id) {
        return db
            .delete('id')
            .from('travels')
            .where('id', travel_id);
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

    async getTravels(user_id) {
        let travel_ids = await db
            .select('travel_id')
            .from('travels_made_by')
            .where('user_id', user_id)
            .returning('travel_id')
            .then((travel_id_results) => {
                let travel_ids = []
                for (const index in travel_id_results) {
                    travel_ids.push(travel_id_results[index].travel_id)
                }
                return travel_ids
            })

        let travels = []

        for (let i = 0; i < travel_ids.length; i++) {
            let travel_id = travel_ids[i]
            let travel = await db
                .select('*')
                .from('travels')
                .where('id', travel_id)
                .then((travel_results) => {
                    let travel_result = travel_results[0]
                    return travel_result
                })

            travels.push(travel)
        }

        return travels
    }
}

module.exports = new TravelsService()
