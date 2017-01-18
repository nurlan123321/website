var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local'), Strategy;
var mongoose = require('mongoose');
var multer = require('multer');
mongoose.connect('mongodb://mongblog:mongblog@ds045704.mlab.com:45704/mongblog')

var routes = require('./routes/index');
var create = require('./routes/create');
var users = require('./routes/users');

var upload = multer({dest: './public/images/uploads'});
var app = express();

//Function text length
app.locals.truncateText = function(text){
  var truncatedText = text.substring(0, length);
  return truncatedText;
}

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passpost init
app.use(passport.initialize());
app.use(passport.session());

//express-validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect-Flash
app.use(flash());

// Global vars
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

app.use('/', routes);
app.use('/post', create);
app.use('/users', users);

app.listen(3000, function(){
  console.log('localhost:3000');
});

module.exports = app;

