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

        console.log(file);
        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files format to upload')
    }
}).single('profile_photo')


const addSP = async (req,res) => {

    console.log(req.body);

    let info = {
        email: req.body.email,
        profile_photo: req.file.path
    }

    const sp = await SellerP.create(info)
res.status(200).send(sp)
console.log(sp)

// res.status(200).send("OK")

}
module.exports = {
    addSP,
    upload

}