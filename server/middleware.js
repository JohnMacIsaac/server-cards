
function checkForHand(req, res, next) {
    if(!req.session.hand) {
        req.session.hand = []
    }
    console.log(req.session.hand)
    next()
}

module.exports = {
    checkForHand
}