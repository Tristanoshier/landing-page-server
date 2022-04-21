const router = require('express').Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Post = require('../db').import('../models/post');
const Project = require('../db').import('../models/project');

// Posts
router.get('/', (req, res) => {
    Post.findAll({
            order: [
                ['id', 'DESC']
            ]
        })
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({
            error: err
        }));
});


router.get('/interests/search', (req, res) => {
    Post.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({
            error: err
        }));
});

router.get('/interests', (req, res) => {
    Post.findAll({
            where: {
                topic: {
                    [Op.ne]: 'blog'
                }
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then(posts => {
            const page = req.query.page;
            const limit = req.query.limit;

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const results = posts.slice(startIndex, endIndex);
            res.status(200).json(results)
        })
        .catch(err => res.status(500).json({
            error: err
        }));
});

router.get('/blog', (req, res) => {
    Post.findAll({
            where: {
                topic: 'blog'
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then(posts => {
            const page = req.query.page;
            const limit = req.query.limit;

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const results = posts.slice(startIndex, endIndex);
            res.status(200).json(results)
        })
        .catch(err => res.status(500).json({
            error: err
        }));
});

// Projects
router.get('/projects', (req, res) => {
    Project.findAll({
            order: [
                ['id', 'DESC']
            ]
        }).then(projectInfo => res.status(200).json(projectInfo))
        .catch(err => res.status(500).json({
            error: err
        }));
});

module.exports = router;