const express = require('express')
const session = require('./store/session')
const router = require('./routes')
const cron = require('node-cron')
const cleanup = require('./controller/cleanup')

const app = express()

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
}

app.use(express.json())
app.use(session)
app.use(router)

cron.schedule('0 0 * * 3', cleanup)

let port = process.env.PORT || 8080
app.listen(port, () => console.log(`App available on http://localhost:${port}`))
