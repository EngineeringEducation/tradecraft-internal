var express = require('express');
var exphbs  = require('express-handlebars'); //https://github.com/ericf/express-handlebars (Non defualt engine)
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require("pg");

var routes = require('./routes/index');
var student = require('./routes/student');
var news = require('./routes/news');
var community = require('./routes/community');

var app = express();

// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connects to postgres once, on server start
var conString = process.env.DATABASE_URL || "postgres://localhost/tradecraft";
var db;
pg.connect(conString, function(err, client) {
  if (err) {
    console.log(err);
  } else {
    db = client;
  }
});

//Keep the DB accessible
app.use(function(req, res, next) {
    req.db = db;
    next();
});

app.use(function(req, res, next) {
    //hard coded for a bit
    req.user = {
        id : 1,
        name : "Liz Howard",
        type : "instructor"
    }
    next()
});

app.use('/', routes);
app.use('/student', student);
app.use('/news', news);
app.use('/community', community);

///These will turn into full-blown controllers later
app.get("/career", function(req, res, next) {
    res.render("career_development")
})
app.use('/tradecraft-brand', function (req, res ) {
  res.render('tradecraft_brand');
});

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
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
