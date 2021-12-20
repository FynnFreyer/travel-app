const session = require('express-session')
const connectRedis = require('connect-redis')
const redis = require('redis')

const RedisStore = connectRedis(session)
const redisClient = redis.createClient({
    url: process.env.REDIS_URL
})

redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

session_options = {
    store: new RedisStore({client: redisClient}),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    rolling: true, // reset expiration countdown on every request
    name: 'session_id',
    cookie: {
        secure: false, // gets set true later if on heroku
        httpOnly: true,
        maxAge: 1000 * 60 * 15, // set max age to 1000 * 60 * 15 ms == 15 min
        sameSite: 'none'
    }
}

if (process.env.NODE_ENV === 'production') {
    session_options.cookie.secure = true // serve secure cookies
    session_options.cookie.domain = 'htw-berlin-webtech-freyer-abdelwadoud.netlify.app'
}

module.exports = session(session_options)
