//controllers
const sellerController = require('../controllers/sellerController')
const adController = require('../controllers/adsController')



const routerse = require('express').Router()
const userMiddleware = require('../middleware/users.js');
const router = require('./router');

//routerse.post('/addSeller' , sellerController.addSeller)

//seller
routerse.get('/allSeller' ,userMiddleware.isLoggedIn, sellerController.getAllSellers)

//router.get('/published' , sellerController.getP)

routerse.get('/getSellerAds/:email',userMiddleware.isLoggedIn, sellerController.getSellerAds)

routerse.get('/:id' ,userMiddleware.isLoggedIn, sellerController.getOneSeller)

routerse.put('/:id',userMiddleware.isLoggedIn,  sellerController.upload, sellerController.addProfileImage, sellerController.updateSeller)

routerse.delete('/:id',userMiddleware.isLoggedIn , sellerController.deleteSeller)




//ads

routerse.post('/ads/addAd' , adController.upload , adController.addAd)

routerse.get('/ads/allAd' , adController.getAllAds)

//router.get('/published' , productController.getPublishedProduct)



routerse.get('/ads/:id' ,userMiddleware.isLoggedIn, adController.getOneAd)

routerse.put('/ads/update/:id',userMiddleware.isLoggedIn, adController.updateAd)

routerse.delete('/ads/delete/:id' ,userMiddleware.isLoggedIn, adController.deleteAd)


//get seller ads

routerse.get('/getSellerAds',sellerController.getSellerAds)

module.exports = routerse