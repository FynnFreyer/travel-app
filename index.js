const express = require('express')
const session = require('./store/session')
const router = require('./routes')


const app = express()

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
}

app.use(express.json())
app.use(session)
app.use(router)

let port = process.env.PORT || 8080
app.listen(port, () => console.log(`App available on http://localhost:${port}`))

/*
//Example for a middle ware to set some headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Content-Type', 'application/json')
    next()
})
 */
