const express = require('express')
const session = require('express-session')
const session_options = require('./store/session_options')
const db = require('./store/db')
const router = require('./routes')


const app = express()

app.use(express.json())

if (process.env.IS_HEROKU) {
    console.log('aoeusnth')
    app.set('trust proxy', 1) // trust first proxy
    session_options.cookie.secure = true // serve secure cookies
    session_options.cookie.domain = 'htw-travel-app.herokuapp.com'
}

app.use(session(session_options))

// allow cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Content-Type', 'application/json')
    next()
})

app.use(router)

let port = process.env.PORT || 8080
app.listen(port, () => console.log(`App available on http://localhost:${port}`))


/*

// allow cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})



const RedisStore = connectRedis(session)
const redisClient = redis.createClient({
    url: process.env.REDIS_URL
})

module.exports = session({
    store: new RedisStore({client: redisClient}),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: {
        secure: false, // gets set true later if in production
        httpOnly: true,
        maxAge: 1000 * 60 * 15 // set max age to 1000 * 60 * 15 ms == 15 min
    }
})

const config: Knex.Config = {
    client: 'postgresql',
    connection: `${process.env.DATABASE_URL'}`,
}


app.get('/', (request, response) => {
    response.send('hello world')
});



emitter.on('mid', on_mid)


console.log('Hi ' + process..env.USER + '!')
emitter.emit('mid')
process.on('exit', on_exit)

function on_mid(event) {
    console.log('interesting ...')
}

function on_exit(event) {
    console.log('Bye ' + process..env.USER + '!')
}
 */
