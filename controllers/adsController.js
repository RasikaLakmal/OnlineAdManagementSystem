const db = require('../models')

const multer = require('multer')
const path = require('path')

//create main Model
const Ad = db.ads
const Review = db.review

//main work

//1.create product

const addAd = async (req,res) => {
    console.log(req.body);
    let info = {
        email: req.body.email,
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


// ads per page
const adPerPage = async (req,res) =>{

    console.log(req.ads)
    let limit =3;
    let offset =0;

    db.ads.findAndCountAll()
    .then((data)=>{
        let page =req.params.page;
        let pages = Math.ceil(data.count/limit);

        offset =limit*(page-1);

        db.ads.findAll({
            attributes:['id','email','description','photos','city','phone_number','topic','createdAt','updatedAt','category', 'price', 'ad_id'],
            limit: limit,
            offset: offset,
            $sort: { id: 1 }
        })
        .then((users)=>{
            res.status(200).json({'result': users, 'count': data.count, 'pages': pages});
        });

        // .catch(function (error) {
        //     res.status(500).send('Internal Server Error');
        // });

    })



}

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


const updatePhotos = async (req, res) =>{

    // const email = req.body.email;
    // const profile_photo = req.file.path;
  
     //Seller.findOneAndUpdate ({
      //   email: req.body.email,profile_photo: req.file.path
      console.log(req.body);
      let id = req.params.id
      let info = {
         
          photos: req.file.path
      }
  
      const sp = await Ad.update({photos: req.file.path}, { where: { id: id}})
  res.status(200).send(sp)
  console.log(sp)
         
  }

module.exports = {
    addAd,
    getAllAds,
    getOneAd,
    updateAd,
    deleteAd,
    adPerPage,
    upload,
    updatePhotos

}
