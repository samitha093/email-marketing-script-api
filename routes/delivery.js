const router = require('express').Router();
let Delivery = require('../models/delivery.model');

router.route('/').get((req, res) => {
    Delivery.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {
    Delivery.findById(req.params.id)
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/').post((req, res) => {
    const host = req.body.host;
    const port = req.body.port;
    const username= req.body.username;
    const password = req.body.password;
    const protocol = req.body.protocol;
    const from = req.body.from;
    const size = req.body.size;

    const newDelivery = new Delivery({
        host,
        from,
        port,
        protocol,
        username,
        password,
        size
    });

    newDelivery.save()
        .then(() => res.json('Server added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});
router.route('/:id').delete((req, res) => {
    Delivery.findByIdAndDelete(req.params.id)
      .then(() => res.json('server deleted!'))
      .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').put((req, res) => {
    Delivery.findById(req.params.id)
    .then(exercise => {
        exercise.host = req.body.host;
        exercise.port = req.body.port;
        exercise.username= req.body.username;
        exercise.password = req.body.password;
        exercise.protocol = req.body.protocol;
        exercise.from = req.body.from;
        exercise.size = req.body.size;

      exercise.save()
        .then(() => res.json('Server updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;