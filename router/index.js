const router = require('express').Router()
const UserController = require('../controllers/userController')
const DataController = require('../controllers/dataController')
const authentication = require('../middleware/authentication')



router.get('/foods',DataController.home) // load food recipe for homepage
router.post('/login', UserController.login) //load login page
router.post('/googlelogin', UserController.googleLogin)

router.use(authentication) //authenticate user before access
// router.get('/home', DataController.homelog) //load homepage after logged in
router.post('/foods/search', DataController.foodData) //load search results




module.exports = router

