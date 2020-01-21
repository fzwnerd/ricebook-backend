var express = require('express');
const bodyParder = require('body-parser');
var User = require('../models/user');
var Profiles = require('../models/profile');
var passport = require('passport');


var router = express.Router();
router.use(bodyParder.json());

// to do
//router.route('/')
//.put((req, res, next) => {
    //console.log(req.user);
    //console.log(req.body);
router.put('/', (req, res) => {
    //console.log(req.body);
    User.findById(req.user._id)
    .then((user) => {
        user.setPassword(req.body.password, function(err,user) {
            if (err)
                next(err);
            else {
                user.save();
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({username: req.user.username, result: 'success'});
            }
        });
    })
    .catch(err => next(err));
})
    

module.exports = router;
  