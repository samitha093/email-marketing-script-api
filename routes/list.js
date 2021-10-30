const router = require('express').Router();
let List = require('../models/list.model');

router.route('/').get((req, res) => {
    List.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {
    List.findById(req.params.id)
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/').post((req, res) => {
    const listname = req.body.listname;
    const list = req.body.list;
    const newList = new List({
        listname,
        list
    });

    newList.save()
        .then(() => res.json('Email list created!'))
        .catch(err => res.status(400).json('Error: ' + err))
});
router.route('/:id').delete((req, res) => {
    List.findByIdAndDelete(req.params.id)
    .then(() => res.json('server deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/email/:id/:email').delete((req, res) => {
    List.findByIdAndUpdate(req.params.id,{$pull: {list: req.params.email}})
        .then(() => res.json('email deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').put((req, res) => {
    List.findByIdAndUpdate(req.params.id,{$push: {list: req.body.email}})
        .then(() => res.json('email added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;