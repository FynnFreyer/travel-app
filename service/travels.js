const db = require('../store/db')

// TODO error handling and req validation?

class TravelsService {
    async createTravel(email, salt, pw_hash) {
        // TODO validate email
        const [id] = await db('users').insert({
            email: email,
            salt: salt,
            pw_hash: pw_hash,
        }).returning('id')

        return id
    }
}

module.exports = new TravelsService()
