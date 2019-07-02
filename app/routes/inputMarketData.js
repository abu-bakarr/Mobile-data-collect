//importing the modules
var express = require('express'); 
var router = express.Router(); 
var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '735498',
    key: '8655bcd26a19abd3e97a',
    secret: '7d23287dd0c4935fe3f0',
    cluster: 'eu',
    encrypted: true
});


//get request for the index
router.get('/inputMarketData', ensureAuthentication, (req, res) => {

    // rendering the page
    res.render('inputMarketView', {
        pageTitle: "inputMarketData",
        pageID: "inputMarketData"
    });
});


// post request for the index
router.post('/inputMarketData', ensureAuthentication, (req, res) => {

    // pusher trigger
    pusher.trigger('market-price', 'whs-price', {
        points: 5,
        district: req.body.mktDistrict,
        price: 100
        
    });

    console.log('data sent');

});

// this function will ensure user authenticate before accessing the interface
function ensureAuthentication(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error_msg', 'You need to login');
        res.redirect('/');
    }
}

//exporting the module 
module.exports = router;