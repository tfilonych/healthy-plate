const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({ message: 'Not Authorized' });
        }

        try {
            const decoded = jwt.verify(token, config.get('accessTokenSecret'));
            req.user = decoded;
            next();
        } catch(err) {
            console.log(err)
        }
    } catch (e) {
        res.status(401).json({ message: 'Not Authorized' })
    }
}