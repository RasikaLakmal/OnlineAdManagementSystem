const db = require('../models')

//create main Model
const User = db.users
const Seller = db.sellers

//main work

//1.create product

const addUser = async (req,res) => {

    let info = {
        email: req.body.email,
        password: req.body.password,
        //published: req.body.published ? req.body.published : false
    }

    var user = await User.create(info)
    var user = await Seller.create(info)
res.status(200).send(user)
console.log(user)

}


// 2.get all products

const getAllUsers = async (req,res) => {

    let users = await User.findAll({})
    res.status(200).send(users)

}

// 3.get single product

const getOneUser = async (req,res) => {

    let id = req.params.id
    let user = await User.findOne({ where: { id: id}})
    res.status(200).send(user)
    
}

// 4.update product
/*
const updateProduct = async (req,res) => {

    let id = req.params.id

    const product = await Product.update(req.body, { where: { id: id}})

res.status(200).send(product)


}*/

// 5.delete product by id

const deleteUser = async (req,res) => {

    let id = req.params.id

    await User.destroy({ where: { id: id}})
    await Seller.destroy({ where: { id: id}})

    res.status(200).send('User is deleted !')
    
}

// 6.get published product

const getPublishedUser = async (req,res) => {

    const users = await User.findAll({ where: { published: true } })

    res.status(200).send(users)
    
}





module.exports = {
    addUser,
    getAllUsers,
    getOneUser,
    deleteUser,
    getPublishedUser
}
