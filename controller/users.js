const usersService = require('../service/users')
const crypto = require("crypto");
const sendVerificationMail = require('../service/emails')
const emailValidator = require('email-validator')

// TODO error handling and req validation?

class UsersController {
    async createUser(req, res) {
        try {
            const {email, password} = req.body
            let valid = true
            if (!emailValidator.validate(email)) {
                // is caught, but fulfills its purpose
                throw new TypeError('not a valid email address')
            }
            let token = crypto.randomBytes(64).toString('base64url').slice(0, 64)
            sendVerificationMail(email, token)
            const id = await usersService.createUser(email, password, token)
            res.status(201).json(id)
        } catch (e) {
            res.status(400).json('Bad request')
        }
    }

    async verifyUser(req, res) {
        try {
            await usersService.verifyUser(req.params.verification_token)
            // TODO URL should not be hardcoded
            res.redirect(301, 'https://htw-berlin-webtech-freyer-abdelwadoud.netlify.app/overview.html')
        } catch (e) {
            res.status(400).json('Bad request')
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const legit = await usersService.checkCredentials(email, password)
            if (legit) {
                //console.log(req.session)
                let user_id = await usersService.getUserID(email)
                let verified = await usersService.getVerifiedStatus(user_id)

                req.session.clientId = crypto.randomBytes(2048).toString('hex')
                req.session.email = email
                req.session.user_id = user_id
                req.session.verified = verified
                res.status(200).json('OK')
            } else {
                res.status(401).json('Unauthorized')
            }
        } catch (e) {
            res.status(400).json('Bad request')
        }
    }

    async logout(req, res) {
        req.session.destroy()
        res.status(200).json('OK')
    }
}

module.exports = new UsersController()
