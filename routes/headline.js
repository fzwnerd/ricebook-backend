var express = require('express');
const bodyParder = require('body-parser');
var User = require('../models/user');
var Profiles = require('../models/profile');
var passport = require('passport');


var router = express.Router();
router.use(bodyParder.json());

router.put('/', (req, res, next) => {
    Profiles.findOneAndUpdate(
        {username: req.user.username},
        {headline: req.body.headline},
        {new: true}
    ).then((profile) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({username: profile.username, headline: profile.headline});
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = router;