var express = require('express');
const bodyParder = require('body-parser');
var User = require('../models/user');
var Profiles = require('../models/profile');
var passport = require('passport');

var router = express.Router();
router.use(bodyParder.json());

router.get('/:user?', (req, res, next) => {
    const names = req.params.user ? req.params.user.split(','): req.user.username;
    Profiles.find({username:{$in:names}})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({headlines: users.map((user) => {
            return {username:user.username, headline:user.headline}
        })})
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = router;