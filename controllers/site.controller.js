const router = require('express').Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Post = require('../db').import('../models/post');

router.get('/', (req, res) => {
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({
            error: err
        }));
});

// GET
router.get('/interests', (req, res) => {
    Post.findAll({
            where: {
                topic: {
                    [Op.ne]: 'blog'
                }
            }
        })
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({
            error: err
        }));
});

router.get('/blog', (req, res) => {
    Post.findAll({
            where: {
                topic: 'blog'
            }
        })
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({
            error: err
        }));
});

module.exports = router;