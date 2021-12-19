const express = require('express')

const session = require('./store/auth')
const router = require('./routes')

const app = express()

app.use(express.json())

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    session.cookie.secure = true // serve secure cookies
}

app.use(session)
app.use(router)

let port = process.env.PORT || 8080
app.listen(port, () => console.log(`App available on http://localhost:${port}`))


/*
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
