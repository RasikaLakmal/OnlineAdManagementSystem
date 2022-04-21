const sellerPController = require('../controllers/sellerPController')
const routerps = require('express').Router()
const multer = require('multer')()

//routerps.get('/allSeller' , sellerPController.getAllSellers)
routerps.post('/addSP' ,sellerPController.upload,sellerPController.addSP )

module.exports = routerps