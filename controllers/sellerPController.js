const db = require('../models')

const multer = require('multer')
const path = require('path')

const SellerP = db.sellerps


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
}).single('profile_photo')


const addSP = async (req,res) => {

    let info = {
        email: req.body.email,
        profile_photo: req.file.path
    }

    const sp = await SellerP.create(info)
res.status(200).send(sp)
console.log(sp)

}
module.exports = {
    addSP,
    upload

}