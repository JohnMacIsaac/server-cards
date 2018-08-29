require('dotenv').config()

const express = require('express')
const {json} = require('body-parser')
const session = require('express-session')

const { getDeck, drawCard, discard, startWar, warDraw } = require('./controllers/mainCtrl')

const { checkForHand } = require('./middleware')

const port = 3001


const app = express()

app.use(json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000000000
    }
}))

app.use(checkForHand)

app.get('/api/getDeck', getDeck)

app.get('/api/draw/:num', drawCard)

app.delete('/api/discard/:ind', discard)

app.get('/api/startWar', startWar)
app.put('/api/warDraw', warDraw)



app.listen(port, ()=> {
   console.log(`We are live on port: ${port}`)
})