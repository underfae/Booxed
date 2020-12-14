const express = require('express')
const bookshelfController = require('../controllers/bookshelf.controller')
const userController = require('../controllers/user.controller')
const libraryController = require('../controllers/library.controller')
const rewardController = require('../controllers/reward.controller')
const orderController = require('../controllers/order.controller')
const commentController = require('../controllers/comment.controller')
const sharedController = require('../controllers/shared.controller')
const moviesController = require('../controllers/movie.controller')
const tokenHelper = require('../config/jwt.helper')

const router = express.Router()

router.post('/register', userController.registerUser)
router.post('/authenticate', userController.authentication)
router.get('/loggedUser', tokenHelper.jwtVerification, userController.loggedUser)
router.put('/modifyUser/:id', userController.modifyUser)

router.post('/bookshelf/create',  bookshelfController.addBookshelf)
router.delete('/bookshelf/:id',  bookshelfController.deleteBookshelf)
router.get('/bookshelf/:id',  bookshelfController.getBookshelf)
router.get('/bookshelves/:id',  bookshelfController.getBookshelves)
router.put('/bookshelf/add/:id',  bookshelfController.addBookToBookshelf)
router.put('/bookshelf/delete',  bookshelfController.deleteBookFromBookshelf)


router.get('/libraries',  libraryController.getLibraries)
router.get('/library/:id',  libraryController.getLibrary)
router.delete('/library/:id',  libraryController.deleteLibrary)
router.post('/library/create',  libraryController.postLibrary)
// router.put('/library/:id',  libraryController.putLibrary)

router.get('/rewards',  rewardController.getRewards)
router.get('/reward/:id',  rewardController.getReward)
router.delete('/reward/:id',  rewardController.deleteReward)
router.post('/reward/create',  rewardController.postReward)
// router.put('/reward/:id',  rewardController.putReward)

router.get('/orders/:id',  orderController.getOrders)
router.get('/order/:id',  orderController.getOrder)
router.delete('/order/:id',  orderController.deleteOrder)
router.post('/order/create',  orderController.postOrder)
// router.put('/order/:id',  orderController.putOrder)

router.get('/comments/:id',  commentController.getComments)
// router.get('/comment/:id',  commentController.getComment)
router.delete('/comment/:id', commentController.deleteComment)
router.post('/comment/create', commentController.postComment)
router.put('/comment/:id', commentController.modifyComment)

router.get('/randomWord', sharedController.getRandomWord)
router.get('/movies/:book_title', moviesController.getMovies )

module.exports = router