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
        res.json({username:name, following:user.following});
    }, (err) => next(err))
    .catch((err) => next(err));
})

router.put('/:user', (req, res, next) => {
    //const name = req.params.user ? req.params.user: req.user.username;
    const host = req.user.username;
    const follower = req.params.user;
    Profiles.findOne({username:host})
    .then((user) => {        
        user.following.push(follower);
        user.save()
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({username:host, following: user.following});
        })                
    }, (err) => next(err))
    .catch((err) => next(err));
})

router.delete('/:user', (req, res, next) => {
    //const name = req.params.user ? req.params.user: req.user.username;
    const host = req.user.username;
    const follower = req.params.user;
    Profiles.findOneAndUpdate({username:host}, {$pull:{following:follower}}, {new:true})
    .then((user) => {              
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({username:host, following: user.following});            
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = router;