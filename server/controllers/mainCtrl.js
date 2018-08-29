const axios = require('axios')


function getDeck(req, res, next) {
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response => {
        req.session.deck_id = response.data.deck_id
        req.session.remaining = response.data.remaining
        res.status(200).send('Got ourselves a deck')
        console.log('hit', req.session)
    })
}


function drawCard(req, res, next) {
    axios.get(`https://deckofcardsapi.com/api/deck/${req.session.deck_id}/draw/?count=${req.params.num}`)
        .then(response => {
        req.session.hand.push(...response.data.cards)
        res.status(200).send(req.session.hand)
    }).catch(err => console.log(err))
}

function startWar(req, res, next) {
    axios.get(`https://deckofcardsapi.com/api/deck/${req.session.deck_id}/draw/?count=52`)
    .then(response => {
        req.session.opponentHand = []
        for(let i = 0; i < response.data.cards.length; i++){
            if(i === 0 || i % 2 === 0){
                req.session.hand.push({value: response.data.cards[i].value, suit: response.data.cards[i].suit})
            }else req.session.opponentHand.push({value: response.data.cards[i].value, suit: response.data.cards[i].suit})
        }
        let hands = {hand: req.session.hand, opponentHand: req.session.opponentHand}
        res.status(200).send(hands)
}).catch(err => console.log(err))
}

function discard(req, res, next) {
    req.session.hand.splice(req.params.ind, 1)
    res.status(200).send(req.session.hand)
}

function warDraw(req, res, next) {
    let userDraw = Math.floor(Math.random(req.session.hand.length))
    let opponentDraw = Math.floor(Math.random(req.session.opponentHand.length))

    res.status(200).send({user: req.session.hand.splice(userDraw, 1), opponent: req.session.opponentHand.splice(opponentDraw, 1)})
}



module.exports = {
    getDeck,
    drawCard,
    discard,
    startWar,
    warDraw
}