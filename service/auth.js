const db = require('../store/db')

class AuthService {
    async checkCredentials(email, password) {
        await db
            .select('salt', 'pw_hash')
            .from('users')
            .where('email', email)
            .then((foo) => {
                console.log(foo)
            })
        return false
    }
}

module.exports = new AuthService()
