const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const router = Router();

router.post(
  '/register',
    [
        check('email',
            'Not valid email'
        ).isEmail(),
        check(
            'password',
            'Min length of password has to be 6 symbols'
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res
                .status(400)
                .json({
                    errors: errors.array(),
                    message: 'Not valid data'
                });
        }

        const { email, password } = req.body;
        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.status(400).json({message: 'User has already exist'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword });

        await user.save();

        res.status(201).json({message: 'User has been created!'});


    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Something went wrong'})
    }
});

router.post(
    '/login',
    [
        check('email',
            'Please, enter a valid email'
        ).normalizeEmail().isEmail(),
        check(
            'password',
            'Min length of password has to be 6 symbols'
        ).exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({
                        errors: errors.array(),
                        message: 'Not valid data during login'
                    });
            }

            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({message: 'User has already exist'});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password' });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            );

            res.json({ token, userId: user.id });

        } catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }
    });

module.exports = router;