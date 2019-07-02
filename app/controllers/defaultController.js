// model
var exportFlowModel = require('../models/exportFlowModel');
var tradeFlowModel = require('../models/tradeFlowModel');
var marketDataModel = require('../models/marketDataModel');

module.exports = {
    // login page get controller
    index: (req, res) => {
        res.render('index', {
            pageTitle: "index",
            pageID: "index"
        });
    },

    // login post controller
    indexPost: (req, res) => {
        res.send('login successful');
        // const { username, password} = req.body;
        // let errors = [];

        // //check required fields
        // if(!username || !password){
        //     errors.push({ msg: 'Please fill in all fields'});
        // } 

        // if(errors.length > 0){
        //     res.render('index',{
        //         errors,
        //         username,
        //         password
        //     });
        // }

    },

    // logout get controller
    logout: (req, res) => {

        req.logout();
        req.flash('success_msg', 'You have logged out');
        res.redirect('/'); //redirecting to the login page
    },

    marketGet: (req, res) => {

        // rendering the page
        res.render('marketView', {
            pageTitle: "inputMarketData",
            pageID: "inputMarketData"
        });
    },

    marketDataPost: (req, res) => {
        const {
            mktLocality,
            mktChiefdom,
            mktDistrict,
            mktRegion,
            mktEnumerator,
            mktProductName,
            WHS_Unit,
            WHS_Weight,
            WHS_Price,
            RET_Unit,
            RET_Weight,
            RET_Price
        } = req.body;

        var newMarketDataFlow = new marketDataModel({
            mktLocality: mktLocality,
            mktChiefdom: mktChiefdom,
            mktDistrict: mktDistrict,
            mktRegion: mktRegion,
            mktEnumerator: mktEnumerator,
            mktProductName: mktProductName,
            WHS_Unit: WHS_Unit,
            WHS_Weight: parseInt(WHS_Weight),
            WHS_Price: parseInt(WHS_Price),
            RET_Unit: RET_Unit,
            RET_Weight: parseInt(RET_Weight),
            RET_Price: parseInt(RET_Price)
        });
        // saving the data
        newMarketDataFlow.save()
            .then(data => {
                res.render('marketView', {
                    pageTitle: "inputMarketData",
                    pageID: "inputMarketData"
                });
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    },

    tradeFlowGet: (req, res) => {

        // rendering the page
        res.render('tradeFlowView', {
            pageTitle: "inputTradeFlowData",
            pageID: "inputTradeFlowData"
        });
    },

    tradeFlowPost: (req, res) => {
        const {
            tradeFlowProductName,
            tradeFlowQuantity,
            tradeFlowPrice,
            tradeFlowEnumerator,
            tradeFlowLocalityFROM,
            tradeFlowChiefdomFROM,
            tradeFlowDistrictsFROM,
            tradeFlowCountryFROM,
            tradeFlowLocalityTO,
            tradeFlowChiefdomTO,
            tradeFlowDistrictsTO,
            tradeFlowCountryTO
        } = req.body;

        var newTradeFlow = new tradeFlowModel({
            product: tradeFlowProductName,
            quantity: tradeFlowQuantity,
            price: tradeFlowPrice,
            enumerator: tradeFlowEnumerator,
            locality_from: tradeFlowLocalityFROM,
            chiefdom_from: tradeFlowChiefdomFROM,
            district_from: tradeFlowDistrictsFROM,
            country_from: tradeFlowCountryFROM,
            locality_to: tradeFlowLocalityTO,
            chiefdom_to: tradeFlowChiefdomTO,
            district_to: tradeFlowDistrictsTO,
            country_to: tradeFlowCountryTO
        });
        // saving the data
        newTradeFlow.save()
            .then(data => {
                res.render('tradeFlowView', {
                    pageTitle: "tradeFlow",
                    pageID: "tradeFlow"
                });
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    },

    exportFlowGet: (req, res) => {

        // rendering the page
        res.render('exportFlowView', {
            pageTitle: "exportFlow",
            pageID: "exportFlow"
        });
    },

    exportFlowPost: (req, res) => {
        // fetch all the fiels
        const {
            name,
            email,
            address,
            phone,
            products,
            weight,
            quantity,
            price,
            district,
            region,
            districtFrom,
            countryTO
        } = req.body;

        // error arrays
        // let errors = [];

        // // check if fields are not empty
        // if(!name || !email || !address || !phone || !products || 
        //     !weight || !quantity || !price || !district || !region|| 
        //     !countryFROM || !countryTO) {
        //         errors.push({ msg: 'Please fill in all fields' });
        // }

        // // check if we do have some errors
        // if(errors.length > 0){
        //     // re-render the page
        //     res.render('partials/forms/export_trade_flow_form',{
        //         pageTitle: "exportFlow",
        //         pageID: "exportFlow",
        //         errors,
        //         name, 
        //         email, 
        //         address, 
        //         phone, 
        //         products, 
        //         weight, 
        //         quantity, 
        //         price, 
        //         district, 
        //         region, 
        //         countryFROM, 
        //         countryTO
        //     });
        // } else {
        // instatiating a new enumerator 
        var newExportFlow = new exportFlowModel({
            name: name,
            email: email,
            address: address,
            phone: phone,
            products: products,
            weight: weight,
            quantity: quantity,
            price: price,
            district: district,
            region: region,
            countryFrom: districtFrom,
            countryTO: countryTO
        });

        // saving the data
        newExportFlow.save()
            .then(data => {
                res.render('exportFlowView', {
                    pageTitle: "exportFlow",
                    pageID: "exportFlow"
                });
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
        // }

    },

    aboutGet: (req, res) => {
        // rendering the page
        res.render('aboutView', {
            pageTitle: "aboutPage",
            pageID: "aboutPage"
        });
    }

};