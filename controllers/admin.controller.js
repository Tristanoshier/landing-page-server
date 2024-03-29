require('dotenv').config();
const router = require('express').Router();
const { Admin } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => { 
    Admin.create({
           username: req.body.username,
           password: bcrypt.hashSync(req.body.password, 10)
        })
       .then(createSuccess = (admin) => {
                let token = jwt.sign({
                        id: admin.id
                    },
                    process.env.JWT_SECRET, {
                        expiresIn: 60 * 60 * 24
                    });
                res.json({
                    admin: admin,
                    message: 'admin user created',
                    sessionToken: token
                });
            },
            createError = err => res.send(500, err)
        );
});


router.post('/login', (req, res) => {
    Admin.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(admin => {
            if (admin) {
                bcrypt.compare(req.body.password, admin.password, (err, matches) => {
                    if (matches) {
                        let token = jwt.sign({
                            id: admin.id
                        }, process.env.JWT_SECRET, {
                            expiresIn: 60 * 60 * 24
                        });
                        res.json({
                            admin: admin,
                            message: 'login success',
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({
                            error: 'bad gateway'
                        });
                    };
                });
            } else {
                res.status(500).send({
                    error: "failed to authenticate"
                });
            };
        }, err => status(501).send({
            error: 'failed to process'
        }));
});

module.exports = router;