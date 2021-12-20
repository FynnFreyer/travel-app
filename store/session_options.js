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
    cookie: {
        secure: false, // gets set true later if on heroku
        httpOnly: false,
        maxAge: 1000 * 60 * 15, // set max age to 1000 * 60 * 15 ms == 15 min
        sameSite: 'none'
    }
}

module.exports = session_options