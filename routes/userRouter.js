const userController = require('../controllers/userController')

const routeru = require('express').Router()

routeru.post('/addUser' , userController.addUser)

routeru.get('/allUser' , userController.getAllUsers)

routeru.get('/published' , userController.getPublishedUser)



routeru.get('/:id' , userController.getOneUser)

//router.put('/:id', userController.updateProduct)

routeru.delete('/:id' , userController.deleteUser)

module.exports = routeru