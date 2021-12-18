//const { EventEmitter } = require('events');
//const emitter = new EventEmitter();

const { readFile } = require('fs').promises

const express = require('express')
const app = express()

app.get('/', (request, response) => {
    response.send('hello world')
});

let port = process.env.PORT || 8080
app.listen(port, () => console.log(`App available on http://localhost:${port}`))


/*
emitter.on('mid', on_mid)


console.log('Hi ' + process.env.USER + '!')
emitter.emit('mid')
process.on('exit', on_exit)

function on_mid(event) {
    console.log('interesting ...')
}

function on_exit(event) {
    console.log('Bye ' + process.env.USER + '!')
}
 */
