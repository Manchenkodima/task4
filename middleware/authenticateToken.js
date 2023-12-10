const jwt = require('jsonwebtoken');
const Sentry = require('@sentry/node')

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null) res.status(401).send({ message: 'Не авторизован' });
        jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            if (err) next(new Error("Не верный токен"));
            req.userId = data.userId;
            next();
        });
    } catch (err) {
        Sentry.captureException(err);
    }
};

module.exports = authenticateToken