const uploadImage = require('../uploadCloudinary');
var express = require('express');
const bodyParder = require('body-parser');
//var User = require('../models/user');
var Profiles = require('../models/profile');
var Posts = require('../models/post');
var passport = require('passport');

var router = express.Router();
router.use(bodyParder.json());

router.post('/', uploadImage('avatar'), (req, res, next) => {
    //console.log(req);
    const picUrl = req.fileurl ? req.fileurl : '';
    Posts.create({
        author: req.user.username,
        body: req.body.text,
        date: new Date(),
        picture: picUrl,
        comments: []
    })
    .then((post) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ articles:[post] });
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = router;