const sellerController = require('../controllers/sellerController')

const routerse = require('express').Router()

//routerse.post('/addSeller' , sellerController.addSeller)

routerse.get('/allSeller' , sellerController.getAllSellers)

//router.get('/published' , sellerController.getP)

routerse.get('/getSellerAds/:email', sellerController.getSellerAds)

routerse.get('/:id' , sellerController.getOneSeller)

routerse.put('/:id', sellerController.updateSeller)

routerse.delete('/:id' , sellerController.deleteSeller)

module.exports = routerse