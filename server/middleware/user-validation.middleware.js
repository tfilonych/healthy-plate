import { check, validationResult } from 'express-validator';

export const registerValidator = (req, res, next) => {
  check('email')
    .isEmail()
    .withMessage('Not valid email')
    check('password')
      .isLength({ min: 6 })
      .withMessage('Min length of password has to be 6 symbols');
  next();
}

export const loginValidator = (req, res, next) => {
    check('email',
      'Please, enter a valid email'
    ).normalizeEmail().isEmail()
    check(
      'password',
      'Min length of password has to be 6 symbols'
    ).exists();
  next();
};

export const resultsValidator = (req) => {
  const messages = [];

  if (!validationResult(req).isEmpty()) {
    const errors = validationResult(req).array()

    for (const i of errors) {
      messages.push(i)
    }
  }
  return messages
}

export default {
  registerValidator,
  loginValidator,
  resultsValidator
}
