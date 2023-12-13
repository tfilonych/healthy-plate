const Router = require('express')
const router = new Router()

const authRouter = require('./auth.route')
const linkRouter = require('./link.route')
const recipeRouter = require('./recipe.route')

router.use('/auth', authRouter)
router.use('/link', linkRouter)
router.use('/recipe', recipeRouter)

module.exports = router;