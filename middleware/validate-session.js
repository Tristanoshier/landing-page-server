const jwt = require('jsonwebtoken');
const PlaceOfLiving = require('../db').import('../models/placeOfLiving');

const validateSession = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    } else {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (!err && decoded) {
                PlaceOfLiving.findOne({
                        where: {
                            id: decoded.id
                        }
                    })
                    .then(placeOfLiving => {
                        if (!placeOfLiving) throw 'err';
                        req.placeOfLiving = placeOfLiving;
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