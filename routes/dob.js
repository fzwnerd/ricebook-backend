var express = require('express');
const bodyParder = require('body-parser');
var User = require('../models/user');
var Profiles = require('../models/profile');
var passport = require('passport');

var router = express.Router();
router.use(bodyParder.json());

router.get('/:user?', (req, res, next) => {
    const name = req.params.user ? req.params.user: req.user.username;
    Profiles.findOne({username:name})
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({username:name, dob:user.dob});
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = router;