const router = require('express').Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {
    Post,
    Project,
    Images
} = require('../models');

const postFavoriteTitles = ['Experiencing Burnout', 'A flame my love, a frequency - Colleen', 'Moving from Indiana to NYC'];
const projectFavoriteTitles = ['Code Databank', 'Sample shop for an artist', 'Portfolio website for a local hair stylist'];

// Posts
router.get('/posts', (req, res) => {
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

router.get('/post/favorites', (req, res) => {
    Post.findAll({
            where: {
                [Op.or]: [{
                        title: postFavoriteTitles[0]
                    },
                    {
                        title: postFavoriteTitles[1]
                    },
                    {
                        title: postFavoriteTitles[2]
                    },
                ]
            }
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

router.get('/projects/images', (req, res) => {
    Images.findAll()
    .then(images => res.status(200).json(images))
        .catch(err => res.status(500).json({
            error: err
        }));
})

// Projects
router.get('/projects/favorites', (req, res) => {
    Project.findAll({
            where: {
                [Op.or]: [{
                        title: projectFavoriteTitles[0]
                    },
                    {
                        title: projectFavoriteTitles[1]
                    },
                    {
                        title: projectFavoriteTitles[2]
                    },
                ]
            },
            include: Images
        })
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({
            error: err
        }));
});

router.get('/projects', (req, res) => {
    Project.findAll({
            include: Images,
            order: [
                ['id', 'DESC']
            ],

        }).then(projectInfo => res.status(200).json(projectInfo))
        .catch(err => res.status(500).json({
            error: err
        }));
});

module.exports = router;