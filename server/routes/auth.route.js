const { Router } = require('express')
const router = Router()
const { registerValidator, loginValidator } = require('../middleware/user-validation.middleware')
const userController = require('../controllers/user-controller')

router.post('/register', registerValidator(), userController.registration)

router.post('/login', loginValidator(), userController.login)

router.post('/logout', userController.logout)

router.get('/activate/:link', userController.activate)

router.get('/refresh', userController.refresh)

module.exports = router;