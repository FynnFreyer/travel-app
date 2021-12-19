// TODO filename is stupid
const session = require("express-session");
const connectRedis = require("connect-redis");
const redis = require("redis");

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
