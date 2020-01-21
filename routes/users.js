var express = require('express');
const bodyParder = require('body-parser');
var User = require('../models/user');
var Profiles = require('../models/profile');
var passport = require('passport');


var router = express.Router();
router.use(bodyParder.json());

//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});

router.post('/register', function(req, res, next) {
  User.register(new User({username: req.body.username}), req.body.password, 
  (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        Profiles.create({
          username: req.body.username,
          email: req.body.email,
          dob: req.body.dob,
          zipcode: req.body.zipcode,
          following: []
        })
        .then((profile) => {
          console.log('new profile created ',  profile);
        }, (err) => next(err))
        .catch((err) => next(err));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({username: req.body.username, result: 'success'});
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  //console.log(req.body);
  //console.log(req.user);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({username: req.user.username, result: 'success'});
});

router.put('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('OK');
    //res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
})

module.exports = router;
