import { check, validationResult } from 'express-validator';

export const registerValidator = () => [
  check('email')
    .isEmail()
    .withMessage('Not valid email'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Min length of password has to be 6 symbols')
]

export const loginValidator = () => [
  check('email',
    'Please, enter a valid email'
  ).normalizeEmail().isEmail(),
  check(
    'password',
    'Min length of password has to be 6 symbols'
  ).exists()
]

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
