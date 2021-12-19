const db = require('../store/db')
const pbkdf2 = require('pbkdf2')
const crypto = require('crypto')

// TODO can never change; bad
const iterations = 100000
const keylen = 1024
const digest = 'SHA256'

class UsersService {

    async createUser(email, password) {
        // TODO validate email
        const {salt, pw_hash} = this.hashPassword(password)

        const [id] = await db.insert({
            email: email,
            salt: salt,
            pw_hash: pw_hash,
        })
            .into('users')
            .returning('id')

        return id
    }

    hashPassword(password) {
        let salt = crypto.randomBytes(64).toString('hex')
        let pw_hash = pbkdf2.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex')

        return {
            salt: salt,
            pw_hash: pw_hash,
        }
    }

    async checkCredentials(email, password) {
        return await db
            .select('salt', 'pw_hash')
            .from('users')
            .where('email', email)
            .then((users) => {
                let user = users[0]
                const {salt, pw_hash} = user
                return this.isPasswordCorrect(pw_hash, salt, password)
            })
    }

    isPasswordCorrect(pw_hash, salt, password) {
        return pw_hash === pbkdf2.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex')
    }

    async getUserID(email) {
        return await db
            .select('id')
            .from('users')
            .where('email', email)
            .then((users) => {
                let user = users[0]
                const {id} = user
                return id
            })
    }
}


module.exports = new UsersService()
