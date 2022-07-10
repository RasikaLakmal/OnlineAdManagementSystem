const db = require('../models')

const multer = require('multer')
const path = require('path')

//import multer from '../models/multer'

//create main Model
const Seller = db.sellers
const User = db.users
const Ad = db.ads

//main work

//1.create product

const addSeller = async (req,res) => {

    let info = {
        //email: req.body.email,
        //first_name: req.body.first_name,
       // last_name: req.body.last_name,
       // phone_number: req.body.phone_number,
       // city: req.body.city,
       // password: req.body.password,
       // confirm_password: req.body.confirm_password,
        profile_photo: req.file.path
        //published: req.body.published ? req.body.published : false
    }

    const seller = await Seller.create(info)
res.status(200).send(seller)
console.log(seller)

}


// 2.get all products

const getAllSellers = async (req,res) => {

    let sellers = await Seller.findAll({})
    res.status(200).send(sellers)

}

// 3.get single product

const getOneSeller = async (req,res) => {

    let id = req.params.id
    let seller = await Seller.findOne({ where: { id: id}})
    res.status(200).send(seller)
    
}

// 4.update product

const updateSeller = async (req,res) => {

    let id = req.params.id

    const seller = await Seller.update(req.body, { where: { id: id}})

res.status(200).send(seller)


}

// 5.delete product by id

const deleteSeller = async (req,res) => {

    let id = req.params.id

    await Seller.destroy({ where: { id: id}})

    res.status(200).send('Seller is deleted !')
    
}
/*
// 6.get published product

const getPublishedProduct = async (req,res) => {

    const products = await Product.findAll({ where: { published: true } })

    res.status(200).send(products)
    
}
*/
// 6. connect one to many relation Seller and Ad

const getSellerAds =  async (req, res) => {

    let email = req.params.email
    let ad = await Ad.findAll({ where: { email: email}})
    res.status(200).send(ad)
    

}


const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
            cb(null,'Images/profile')
    },
    filename: (req, file, cb)=>{
             cb(null,  Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: '50000000'},
    fileFilter: (req, file, cb) =>{
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files format to upload')
    }
}).single('profile_photo')

const addProfileImage = async (req, res) =>{

   // const email = req.body.email;
   // const profile_photo = req.file.path;
 
    //Seller.findOneAndUpdate ({
     //   email: req.body.email,profile_photo: req.file.path
     console.log(req.body);
     let id = req.params.id
     let info = {
        
         profile_photo: req.file.path
     }
 
     const sp = await Seller.update({profile_photo: req.file.path}, { where: { id: id}})
 res.status(200).send(sp)
 console.log(sp)
        
 }



module.exports = {
   
    getAllSellers,
    getOneSeller,
    updateSeller,
    deleteSeller,
    getSellerAds,
    addProfileImage,
    upload
}
