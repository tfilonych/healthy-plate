const config = require('config')
const { resultsValidator } = require('../middleware/user-validation.middleware')
const userService = require('../services/user-service')

class UserController {
  async registration (req, res, next) {
    try {
      const errors = resultsValidator(req)

      if (errors.length > 0) {
        return res
          .status(400)
          .json({
            errors: errors,
            message: 'Not valid data'
          })
      }
      const { email, password } = req.body
      const userData = await userService.registration(email, password)

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      res.status(201).json({ message: 'User has been created!' })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }

  async login (req, res, next) {
    console.log('INSIDE LOGIN USER CONTROLLER')
    try {
      const errors = resultsValidator(req)
      console.log('ERRORS LENGTH ');
      console.log(errors)

      if(errors.length > 0) {
        return res
          .status(400)
          .json({
            message: 'Not valid data during login'
          })
      }
      const { email, password } = req.body
      const token = await userService.login(email, password)

      res.cookie('refreshToken', token.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      res.status(200).json({token: token})

    } catch (e) {
      res.status(500).json({ message: e?.message ?? 'Something went wrong' })
    }
  }

  async logout (req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)

      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      console.log(e)
    }
  }

  async activate (req, res, next) {
    try {
      const { link } = req.params

      await userService.activate(link)
      res.redirect(config.get('clientURL'))

    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' })
    }
  }

  async refresh (req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      res.status(200).json({ ...userData })
    } catch (e) {

    }
  }
}

module.exports = new UserController()
