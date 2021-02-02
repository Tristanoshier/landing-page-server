const jwt = require('jsonwebtoken');
const Admin = require('../db').import('../models/admin');

const validateSession = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    } else {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (!err && decoded) {
                Admin.findOne({
                        where: {
                            id: decoded.id
                        }
                    })
                    .then(admin => {
                        if (!admin) throw 'err';
                        req.admin = admin;
                        return next();
                    })
                    .catch(err => next(err))
            } else {
                req.errors = err;
                return res.status(500).send('Not Authorized');
            };
        });
    };
};

module.exports = validateSession;