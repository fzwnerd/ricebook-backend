var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var passwordRouter = require('./routes/password');
var headlineRouter = require('./routes/headline');
var headlinesRouter = require('./routes/headlines');
var avatarRouter = require('./routes/avatar');
var avatarsRouter = require('./routes/avatars');
var emailRouter = require('./routes/email');
var zipcodeRouter = require('./routes/zipcode');
var dobRouter = require('./routes/dob');
var followingRouter = require('./routes/following');
var articleRouter = require('./routes/article');
var articlesRouter = require('./routes/articles');

const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const cors = require('./routes/cors');

const url = 'mongodb://127.0.0.1:27017/ricebook';

const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('connected correctly to server');
}, (err) => { console.log(err); })


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
console.log(process.env.PORT);
//app.set('port', process.env.PORT || 8080);

const enableCORS = (req,res,next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin)
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials',true)
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
  next()
}
app.use(enableCORS);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized:  false,
  resave: false,
  store: new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());



//app.use('/', indexRouter);
app.use('/', usersRouter);

function auth(req, res, next) {
  if (!req.user) {
    var err = new Error('You are not authenticated!');
    err.status = 401;
    return next(err);
  }
  else {
      next();
  }
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/password', passwordRouter);
app.use('/headline', headlineRouter);
app.use('/headlines', headlinesRouter);
app.use('/avatar', avatarRouter);
app.use('/avatars', avatarsRouter);
app.use('/email', emailRouter);
app.use('/zipcode', zipcodeRouter);
app.use('/dob', dobRouter);
app.use('/following', followingRouter);
app.use('/article', articleRouter);
app.use('/articles', articlesRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
const server = app.listen(3443, () => {
  const addr = server.address()
  console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
*/
module.exports = app;
