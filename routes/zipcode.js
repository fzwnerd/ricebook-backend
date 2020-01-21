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
        //res.json({headlines: users.map((user) => {
        //    return {username:user.username, headline:user.headline}
        //})})
        res.json({username:name, zipcode:user.zipcode});
    }, (err) => next(err))
    .catch((err) => next(err));
})

router.put('/', (req, res, next) => {
    const name = req.user.username;
    Profiles.findOneAndUpdate({username:name}, {zipcode:req.body.zipcode}, {new:true})
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({username:name, zipcode:user.zipcode});
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = router;