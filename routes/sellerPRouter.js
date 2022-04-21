const sellerPController = require('../controllers/sellerPController')
const routerps = require('express').Router()

//routerps.get('/allSeller' , sellerPController.getAllSellers)
routerps.post('/addSP' ,sellerPController.addSP, sellerPController.upload )

module.exports = routerps