var config = require('./oauth.js')
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index.js')
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var fbAuth = require('./authentication.js');
var User = require('./models/user_model.js').user;

var app = express();

//Set up mongolab and PORTS to work locally and on heroku
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);
var PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secret', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// serialize and deserialize users
passport.serializeUser(function(user, done) {
 console.log('serializeUser: ' + user._id)
 done(null, user._id);
});
passport.deserializeUser(function(id, done) {
 User.findById(id, function(err, user){
     console.log(user)
     if(!err) done(null, user);
     else done(err, null)
 })
});

function ensureAuthenticated(req, res, next) {
if (req.isAuthenticated()) { return next(); }
console.log('ensureauthenticated says you are not authenticated');
res.redirect('/')
}

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', index.login_page);
app.get('/login', index.login_page);
app.get('/home', ensureAuthenticated, index.home);
app.get('/auth/facebook', passport.authenticate('facebook'), index.auth_facebook);
app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}), index.auth_facebook_callback);
app.post('/logout', index.logout);
app.post('/delete_twote', ensureAuthenticated, index.delete_twote);
app.post('/twote_submit', ensureAuthenticated, index.twote_submit);

app.listen(PORT, function(){
    console.log("Application running on port:", PORT);
});
