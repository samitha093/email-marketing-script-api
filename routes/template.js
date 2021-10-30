const router = require('express').Router();
let Template = require('../models/template.model');

router.route('/').get((req, res) => {
    Template.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Template.findById(req.params.id)
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const templatename = req.body.templatename;
    const subject = req.body.subject;
    const htmlcord = req.body.htmlcord;
    const newList = new Template({
        templatename,
        subject,
        htmlcord
    });

    newList.save()
        .then(() => res.json('Email list created!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').delete((req, res) => {
    Template.findByIdAndDelete(req.params.id)
    .then(() => res.json('server deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    Template.findById(req.params.id)
    .then(exercise => {
        exercise.templatename = req.body.templatename;
        exercise.subject = req.body.subject;
        exercise.htmlcord= req.body.htmlcord;

      exercise.save()
        .then(() => res.json('Server updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;