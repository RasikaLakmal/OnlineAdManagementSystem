const db = require('../models')

const multer = require('multer')
const path = require('path')

//create main Model
const Ad = db.ads
const Review = db.review

//main work

//1.create product

const addAd = async (req,res) => {

    let info = {
        email: req.body.email,
        ad_id: req.body.ad_id,
        description: req.body.description,
        photos: req.file.path,
        city: req.body.city,
        phone_number: req.body.phone_number,
        posted_date: req.body.posted_date,
        topic: req.body.topic,
        category: req.body.category,
        price: req.body.price
        //published: req.body.published ? req.body.published : false
    }

    const ad = await Ad.create(info)
res.status(200).send(ad)
console.log(ad)

}


// 2.get all products

const getAllAds = async (req,res) => {

    let ads = await Ad.findAll({})
    res.status(200).send(ads)

}

// 3.get single product

const getOneAd = async (req,res) => {

    let id = req.params.id
    let ad = await Ad.findOne({ where: { id: id}})
    res.status(200).send(ad)
    
}

// 4.update product

const updateAd = async (req,res) => {

    let id = req.params.id

    const ad = await Ad.update(req.body, { where: { id: id}})

res.status(200).send(ad)


}

// 5.delete product by id

const deleteAd = async (req,res) => {

    let id = req.params.id

    await Ad.destroy({ where: { id: id}})

    res.status(200).send('Ad is deleted !')
    
}
/*
// 6.get published product

const getPublishedAd = async (req,res) => {

    const ads = await Ad.findAll({ where: { published: true } })

    res.status(200).send(ads)
    
}

*/
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
            cb(null,'Images/Ads')
    },
    filename: (req, file, cb)=>{
             cb(null,  Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: '50000000000'},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files format to upload')
    }
}).single('photos')




module.exports = {
    addAd,
    getAllAds,
    getOneAd,
    updateAd,
    deleteAd,
    upload

}
