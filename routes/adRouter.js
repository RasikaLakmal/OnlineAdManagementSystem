const adController = require('../controllers/adsController')

const routerad = require('express').Router()


routerad.get('/allAd' , adController.getAllAds)

routerad.get('/:id' , adController.getOneAd)

//router.get('/published' , productController.getPublishedProduct)

//routerad.put('/:id', adController.updateAd)

//routerad.delete('/:id' , adController.deleteAd)


module.exports = routerad