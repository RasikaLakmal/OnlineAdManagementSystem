const userController = require('../controllers/userController')
const routeru = require('express').Router()
const userMiddleware = require('../middleware/users.js');

routeru.post('/addUser' , userController.addUser)

routeru.get('/allUser' , userController.getAllUsers)

routeru.get('/published' , userController.getPublishedUser)



routeru.get('/:id' ,userMiddleware.isLoggedIn, userController.getOneUser)

//router.put('/:id', userController.updateProduct)

routeru.delete('/:id' ,userMiddleware.isLoggedIn, userController.deleteUser)

module.exports = routeru