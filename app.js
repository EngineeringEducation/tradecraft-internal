//The Granddaddy Package
var express = require('express');

//View Related
var nunjucks  = require('nunjucks'); //http://mozilla.github.io/nunjucks/

//Webserver Tools
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var _ = require('underscore');

//Persistance
var pg = require("pg");

//These are all for login stuff
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisSessionStore = require('connect-redis')(session);
var uid2 = require('uid2');
var passport = require('passport');

// Include Controllers
var routes = require('./routes/index');
var student = require('./routes/student');
var news = require('./routes/news');
var community = require('./routes/community');
var curriculum = require('./routes/curriculum');
var assignments = require('./routes/assignments');


//Include Models
var User = require('./models/user')

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ 
        dest: './uploads/', 
        rename: function (fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
        }
    }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
var GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

// view engine setup
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// PERSISTENCE RELATED

//MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tradecraft');
var mongo = mongoose.connection;
//Which uses event based stuff
mongo.on('error', console.error.bind(console, 'connection error:'));
mongo.once('open', function (callback) {
  console.log("'I am open.' -mongodb");
});

//Keep the DB accessible
app.use(function(req, res, next) {
    req.mongo = mongo;
    next();
});

//// AUTHENTICATION RELATED
    //Tabbed over because it's a big hunk I want to factor out.
        
    // Sessions
    //Sets up a session instance, tells the app to use it
    //Sets up a function to generate unique identifiers for each session
    //Sets the app secret, in order to hash things
    //Sets the session to be secure, indicating people shouldn't be able to spoof each other's sessions
    //Sets up a session store, an instance of a Redis client, to hold on to the actual data in sessions, rather than sending an increasing amount of data back to the browser every time.
    //Once we deploy this probably has use https://github.com/ddollar/redis-url to parse
    app.use(session({
      saveUninitialized: true,
      genid: function(req) {
        return uid2(32); // use UUIDs for session IDs
      },
      secret: process.env.SESSION_SECRET,
      secure: true,
      store: new RedisSessionStore({
        host: process.env.REDIS_SESSION_HOST,
        port: process.env.REDIS_SESSION_PORT
      }),
      resave: true
    }))

    // Passport setup
    // OK YOU GOTTA ENABLE GOOGLE+ or this shit don't work 
    // https://github.com/jaredhanson/passport-google-oauth/issues/46
    passport.use(new GoogleStrategy({ 
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_CALLBACK_URL
        },
        function(accessToken, refreshToken, profile, done) {
            console.log("User from google: ", profile);
            User.find({provider_id: profile.id}, function(err, user) {
                if (err) throw err;
                if (user.length > 0) {
                    done(err, user[0]);
                } else {
                    console.log(typeof profile.emails)
                    if (typeof profile.emails == 'object') {
                        var emails = profile.emails
                        profile.emails = [];
                        profile.emails.push(emails);
                    }
                    var newUser = new User({
                        name: profile.name,
                        provider: "google",
                        provider_id: profile.id,
                        displayName: profile.displayName,
                        emails: profile.emails,
                        photos: profile.photos,
                        gender: profile.gender,
                        created_at: new Date(),
                        updated_at: new Date(),
                        last_seen: new Date()
                    });

                    newUser.save(function(err) {
                        console.log("err:", err);
                        done(err, newUser);
                    });
                }
            });
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());


    //// ### OTHER RANDOM SHIT
    passport.serializeUser(function(user, done) {
        done(null, JSON.stringify(user));
    });

    passport.deserializeUser(function(user, callback){
        user = JSON.parse(user);
        if (user) {
            User.findById(user._id, function(err, user) {
                if (err) throw err;
                console.log(user, " deserializeUser")
                callback(null, user);
            });
        } else {
            callback(err, null);
        }
        
    });

    //## AUTHENTICATION ROUTES ##
    app.use('/auth/google', passport.authenticate('google',  
        { scope: ['https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read',
        'https://www.googleapis.com/auth/calendar'] }),
        function(req, res){
            console.log("response after scopes")
        } 
    );

    //redirect after authenticate
    app.use('/oauth2callback',
      passport.authenticate('google', { failureRedirect: '/login_fail'}),
      function(req, res) {
        console.log("oauth2callback");
        if (!req.user.track) {
            res.redirect('/student/onboarding')
        } else {
            res.redirect('/');
        }
      }
    );

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });


/// #### CONTROLLERS
app.use('/',  routes);
app.use('/student', student);
app.use('/news', news);
app.use('/community', community);
app.use('/curriculum', curriculum);
app.use('/assignments', assignments);


/// ### One-off, temporary, factor out later
///These will turn into full-blown controllers later
app.get("/career", function(req, res, next) {
    res.render("career_development.html")
})
app.use('/tradecraft-brand', function (req, res ) {
  res.render('tradecraft_brand.html');
});




//// ## ERROR HANDLING

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error.html', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
        message: err.message,
        error: err
    });
});


module.exports = app;
