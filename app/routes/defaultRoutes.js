// modules
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var defaultController = require('../controllers/defaultController');

//importing the  model
var Enumerators = require('../models/enumerator_model');

passport.use(new LocalStrategy(
    function(username, password, done) {
        Enumerators.getEnumeratorByUsername(username, (err, enumerator) => {
            if(err) throw err;
            if(!enumerator){
                return done(null, false, {message: 'Incorrect Username'});
            }

        // checking if the password matches
        Enumerators.comparePassword(password, enumerator.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                return done(null, enumerator);
            }else{
                return done(null, false, {message: 'Incorrect Password'});
            }
        });
       });
    }
));

passport.serializeUser((enumerator, done) => {
    done(null, enumerator.id);
});

passport.deserializeUser((id, done) => {
    Enumerators.getEnumeratorById(id, function(err, enumerator){
        done(err, enumerator);
    });
});

// index route 
router.route('/')
    .get(defaultController.index)
    .post(// authenticating the user
        passport.authenticate('local', {
            successRedirect: '/inputMarketData',
            failureRedirect: '/',
            failureFlash: true
        }),defaultController.indexPost);

// logout route
router.route('/logout')
    .get(defaultController.logout);

router.route('/inputMarketData') //ensureAuthentication
    .get(defaultController.marketGet)
    .post(defaultController.marketDataPost);


router.route('/inputTradeFlowData') //ensureAuthentication
    .get(defaultController.tradeFlowGet)
    .post(defaultController.tradeFlowPost);

router.route('/inputExportFlow') //ensureAuthentication
    .get(defaultController.exportFlowGet)
    .post(defaultController.exportFlowPost);

router.route('/about')
    .get(defaultController.aboutGet);


module.exports = router;

