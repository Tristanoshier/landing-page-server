const router = require('express').Router();
const Post = require('../db').import('../models/post');

// POST
router.post('/create', (req, res) => {
    const post = {
        title: req.body.title,
        body: req.body.body,
        topic: req.body.topic,
        adminId: req.admin.id
    };
    Post.create(post)
        .then(postInfo => res.status(200).json(postInfo))
        .catch(err => res.status(500).json({
            error: err
        }));
});

// UPDATE
router.put('/update/:id', (req, res) => {
    Post.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(post => res.status(200).json(post))
        .catch(() => res.json(req.errors))
});

// DELETE
router.delete('/delete/:id', (req, res) => {
    Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(post => res.status(200).json(post))
        .catch(err => res.json({
            error: err
        }));
});

module.exports = router;