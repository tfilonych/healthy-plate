import config from 'config';
import { resultsValidator } from '../middleware/user-validation.middleware';
import userService from  '../services/user-service';
import dbConnect from '../db'

class UserController {
  async registration (req, res) {
    try {
      const errors = resultsValidator(req)
      console.log(errors)

      if (errors.length > 0) {
        return res
          .status(400)
          .json({
            errors: errors,
            message: 'Not valid data'
          })
      }
      const userData = await userService.registration(req.body)

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      res.status(201).json({ message: 'User has been created!', userData })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }

  async login(req, res) {
    try {
      const errors = resultsValidator(req)
      console.log(errors)

      if (errors.length > 0) {
        return res
          .status(400)
          .json({
            message: 'Not valid data during login'
          })
      }
      const { email, password } = req.body
      await dbConnect();
      const token = await userService.login(email, password)

      res.cookie('refreshToken', token.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      res.status(200).json({ token: token })

    } catch (e) {
      res.status(500).json({ message: e?.message ?? 'Something went wrong' })
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)

      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      console.log(e)
    }
  }

  async activate(req, res) {
    try {
      const { link } = req.params

      await userService.activate(link)
      res.redirect(config.get('clientURL'))

    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' })
    }
  }

  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      res.status(200).json({ ...userData })
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserController()
