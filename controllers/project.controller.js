const router = require('express').Router();
const Project = require('../db').import('../models/project');

// POST
router.post('/create', (req, res) => {
    const project = {
        title: req.body.title,
        languages: req.body.languages,
        description: req.body.description,
        link: req.body.link,
        adminId: req.admin.id
    };
    Project.create(project)
        .then(projectInfo => res.status(200).json(projectInfo))
        .catch(err => res.status(500).json({
            error: err
        }));
});

// UPDATE
router.put('/update/:id', (req, res) => {
    Project.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(projectInfo => res.status(200).json(projectInfo))
        .catch(() => res.json(req.errors))
});

// DELETE
router.delete('/delete/:id', (req, res) => {
    Project.destroy({
            where: {
                id: req.params.id
            }
        }).then(projectInfo => res.status(200).json(projectInfo))
        .catch(err => res.json({
            error: err
        }));
});

module.exports = router;