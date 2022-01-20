const db = require('../store/db')
const pbkdf2 = require('pbkdf2')
const crypto = require('crypto')

// TODO can never change; bad
//  should probably rather be stored in database
//  for every individual user account,
//  and controlled by env var, config file or something similar
const iterations = 100000
const keylen = 1024
const digest = 'SHA256'

class UsersService {

    async createUser(email, password, verification_token) {
        const {salt, pw_hash} = this.hashPassword(password)

        const [id] = await db.insert({
            email: email,
            salt: salt,
            pw_hash: pw_hash,
            verification_token: verification_token
        })
            .into('users')
            .returning('id')

        return id
    }

    async verifyUser(verification_token) {
        const [id] = await db('users')
            .where('verification_token', verification_token)
            .update('verified', true, 'id')

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

    async getVerifiedStatus(id) {
        return await db
            .select('verified')
            .from('users')
            .where('id', id)
            .then((users) => {
                let user = users[0]
                const {verified} = user
                return verified
            })
    }
}


module.exports = new UsersService()
