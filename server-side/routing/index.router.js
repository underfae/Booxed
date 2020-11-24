const express = require('express')
const bookshelfController = require('../controllers/bookshelf.controller')
const userController = require('../controllers/user.controller')
const tokenHelper = require('../config/jwt.helper')

const router = express.Router()

router.post('/register', userController.registerUser)
router.post('/authenticate', userController.authentication)
router.get('/loggedUser', tokenHelper.jwtVerification, userController.loggedUser)

router.post('/bookshelf/create',  bookshelfController.addBookshelf)
router.delete('/bookshelf/:id',  bookshelfController.deleteBookshelf)
router.get('/bookshelf/:id',  bookshelfController.getBookshelf)
// router.put('/bookshelf/:id',  bookshelfController.putBookshelf)
router.get('/bookshelves/:id',  bookshelfController.getBookshelves)


module.exports = router