import config from 'config';
import { resultsValidator } from '../middleware/user-validation.middleware';
import userService from '../services/user-service';

const COOKIE_OPTIONS = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true
};

class UserController {
  errorHandler(res, statusCode, message = 'Something went wrong') {
    res.status(statusCode).json({ message });
  }

  async registration(req, res) {
    try {
      const errors = resultsValidator(req);

      if (errors.length > 0) {
        return res
          .status(400)
          .json({
            errors: errors,
            message: 'Not valid data'
          });
      }
      const userData = await userService.registration(req.body);

      res.cookie('refreshToken', userData.refreshToken, COOKIE_OPTIONS);
      res.status(201).json({ message: 'User has been created!', userData });
    } catch (e) {
      this.errorHandler(res, 500, e.message);
    }
  }

  async login(req, res) {
    try {
      const errors = resultsValidator(req);

      if (errors.length > 0) {
        return res
          .status(400)
          .json({
            message: 'Not valid data during login'
          });
      }
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, COOKIE_OPTIONS);
      res.status(200).json({ ...userData });

    } catch (e) {
      this.errorHandler(res, 500, e.message);
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);

      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      console.log(e);
    }
  }

  async activate(req, res) {
    try {
      const { link } = req.params;

      await userService.activate(link);
      res.redirect(config.get('clientURL'));

    } catch (e) {
      this.errorHandler(res, 500, e.message);
    }
  }

  async token(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, COOKIE_OPTIONS);
      res.status(200).json({ ...userData });
    } catch (e) {
      res.status(403).json({ message: e });
      this.errorHandler(res, 403, e.message);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, COOKIE_OPTIONS);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
