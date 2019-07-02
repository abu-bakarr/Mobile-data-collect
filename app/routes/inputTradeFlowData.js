//importing the modules
var express = require('express'); 
var router = express.Router(); 
var bodyParser = require('body-parser');

//body parse middle ware
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//get request for the index
router.get('/inputTradeFlowData', ensureAuthentication, function(req, res){

    // rendering the page
    res.render('inputTradeFlowView', {
        pageTitle: "inputTradeFlowData",
        pageID: "inputTradeFlowData"
    });
});

// post request for the index
router.post('/inputTradeFlowData',urlencodedParser,function(req,res){

    var data = req.body;

    console.log(data);

});

// // this function will ensure user authenticate before accessing the interface
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