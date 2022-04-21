const adController = require('../controllers/adsController')

const routerad = require('express').Router()

routerad.post('/addAd' , adController.upload , adController.addAd)

routerad.get('/allAd' , adController.getAllAds)

//router.get('/published' , productController.getPublishedProduct)



routerad.get('/:id' , adController.getOneAd)

routerad.put('/:id', adController.updateAd)

routerad.delete('/:id' , adController.deleteAd)


module.exports = routerad