//controllers
const sellerController = require('../controllers/sellerController')
const adController = require('../controllers/adsController')



const routerse = require('express').Router()
const userMiddleware = require('../middleware/users.js');
const router = require('./router');

//routerse.post('/addSeller' , sellerController.addSeller)

//seller

routerse.put('/update/:id',userMiddleware.isLoggedIn, sellerController.updateSeller) //update seller profile

routerse.put('/profilepic/:id',userMiddleware.isLoggedIn,sellerController.upload,  sellerController.addProfileImage)

routerse.delete('/:id',userMiddleware.isLoggedIn , sellerController.deleteSeller) //delete seller

//router.get('/published' , sellerController.getP)


//ads by auth seller

routerse.post('/ads/addAd' , adController.upload , adController.addAd)

routerse.delete('/ads/delete/:id' ,userMiddleware.isLoggedIn, adController.deleteAd)

routerse.put('/ads/update/:id',userMiddleware.isLoggedIn,adController.updateAd)

routerse.put('/ads/photos/:id',userMiddleware.isLoggedIn, adController.upload,adController.updatePhotos)

//router.get('/published' , productController.getPublishedProduct)

routerse.get('/ads/:id' ,userMiddleware.isLoggedIn, adController.getOneAd)


//user
routerse.get('/allSeller' , sellerController.getAllSellers)

routerse.get('/ads/allAd' , adController.getAllAds) //all ads

routerse.get('/:id' , sellerController.getOneSeller) //get seller profile by user


//get seller ads

routerse.get('/getSellerAds/:email', sellerController.getSellerAds)

module.exports = routerse