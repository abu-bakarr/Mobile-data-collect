var express = require('express');
var app = express();
var firebase = require('firebase-admin');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var passport = require('passport');
// var method_override = require('method-override');


// getting the sevicekey
var serviceAccount = require('./greentaCollectServiceAccountKey.json')

// initializing the app
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://greenta-collect.firebaseio.com"
});

//connecting to mongodb
// OFFLINE CONNECTION
// mongoose.connect('mongodb://localhost/amisapp', { useNewUrlParser: true })
//     .then(() => console.log('Database Local Connection Successful'))
//     .catch(err => console.log(err))

//requring the database configuration
var db = require('./app/config/dbConfig').MongoURI;

// connecting to mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Database Connection Successful'))
    .catch(err => console.log(err));


// getting access to the database
var db = firebase.database();
var ref = db.ref('greenta-collect'); //making a reference of the database

// app.set('varRef',ref);
var usersRef = ref.child("farmers");
usersRef.set({});

//setting an environment variable
app.set('port', process.env.PORT || 4000);

//setting up a view engine
app.set('view engine', 'ejs');
app.set('views', './app/views'); //specifying the view folder location

app.locals.siteTitle = 'AMIS';

//accessing the static files
app.use(express.static('./app/public'));

// accept url encoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// accept json 
app.use(bodyParser.json());

// Express Validator Middleware
// app.use(expressValidator());
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namesapce.shift() + ']';
        }
        return {
            param: formParam,
            message: msg,
            value: value
        };
    }
}));

// Body parser Middleware
app.use(cookieParser());

// Express Session MIddleware
app.use(session({
    secret: 'secret-key',
    saveUninitialized: true,
    resave: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash Middleware
app.use(flash());

// Flash Middleware Global Variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//creating access to the routes
const defaultRoute = require('./app/routes/defaultRoutes');

// using the middlewares
app.use('/', defaultRoute);

//listening to the 3000 port
var server = app.listen(app.get('port'), function() {
    console.log('listening on port ' + app.get('port'));
});