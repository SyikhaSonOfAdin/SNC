const jwt = require('jsonwebtoken');

const jwtServices = {
    verifyToken: {
        byHeader: (req, res, next) => {
            const authHeader = req.headers['authorization'];
            const token = authHeader

            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }

            jwt.verify(token, process.env.PASSWORD, (err, user) => {
                if (err) return res.status(403).json({ message: 'Expired token, please login again!' });
                next();
            });
        },
        byQuery: (req, res, next) => {
            const token = req.query.token

            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }

            jwt.verify(token, process.env.PASSWORD, (err, user) => {
                if (err) return res.status(403).json({ message: 'Expired token, please login again!' });
                next();
            });
        }
    }
}

module.exports = {
    jwtServices
}