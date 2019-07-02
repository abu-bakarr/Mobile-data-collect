// INITALIZING FARMERS DATA TABLE / COLLECTION REFERENCE
var connectedRef = firebase.database().ref(".info/connected"); // will holds the offline data
var prodMarketRef = firebase.database().ref('productMarketData');

// setting the database app persistence for offline cache storage
// FirebaseDatabase.service.setPersistenceEnabled( true );

// var ref:DatabaseReference = FirebaseDatabase.service.getReference("scores");
// ref.keepSynced(true);

// //This will work
// root.child("event_list").keepSynced(true);
// root.child("user_events").child(uid).keepSynced(true);

var offlineData = [];

// this event listener is listening for a form submit
document.getElementById('productMarketForm').addEventListener('submit', submitMarketForm);

// submitFarmersForm function
function submitMarketForm(e) {

    //preventing the form from submit automatically
    e.preventDefault();

    // getting the values
    var prodMktLocality = getInptValue('mktLocality');
    var prodMktChiefdom = getInptValue('mktChiefdom');
    var prodMktDistrict = getInptValue('mktDistrict');
    var prodMktRegion = getInptValue('mktRegion');
    var prodMktEnumerator = getInptValue('mktEnumerator');
    var prodMktDate = getInptValue('mktDate');
    var prodName = getInptValue('products');
    var prodMktWHS_Unit = getInptValue('WHS_Unit');
    var prodMktWHS_Weight = parseInt(getInptValue('WHS_Weight'));
    var prodMktWHS_Price = parseInt(getInptValue('WHS_Price'));
    var prodMktRET_Unit = getInptValue('RET_Unit');
    var prodMktRET_Weight = parseInt(getInptValue('RET_Weight'));
    var prodMktRET_Price = parseInt(getInptValue('RET_Price'));

    connectedRef.on("value", function(snap) {
        if (snap.val() === true) {
            console.log("connected");
            //calling the send and save data
            saveMarketData(prodMktLocality, prodMktChiefdom, prodMktDistrict, prodMktRegion, prodMktEnumerator, prodMktDate,
                prodName, prodMktWHS_Unit, prodMktWHS_Weight, prodMktWHS_Price, prodMktRET_Unit, prodMktRET_Weight, prodMktRET_Price);

        } else {
            console.log("not connected");
        }
    });

    // connectedRef.on("value", function(snap) {
    //     if (snap.val() === true) {

    //         console.log("connected");
    //         //calling the send and save data
    //         saveMarketData(prodMktLocality,prodMktChiefdom,prodMktDistrict,prodMktRegion,prodMktEnumerator,prodMktDate,
    //             prodName, prodMktWHS_Unit, prodMktWHS_Weight, prodMktWHS_Price, prodMktRET_Unit, prodMktRET_Weight, prodMktRET_Price);

    //         offlineData.reset(); // reseting the array
    //     } else {
    //         console.log("not connected");

    //         offlineData += saveMarketData(prodMktLocality,prodMktChiefdom,prodMktDistrict,prodMktRegion,prodMktEnumerator,prodMktDate,
    //             prodName, prodMktWHS_Unit, prodMktWHS_Weight, prodMktWHS_Price, prodMktRET_Unit, prodMktRET_Weight, prodMktRET_Price);
    //     }
    // });

    // making a new market post  request to the server 
    $('#btn-new-mktData').click(e => {
        e.preventDefault();

        // // getting the values
        // var prodMktLocality = getInptValue('mktLocality');
        // var prodMktChiefdom = getInptValue('mktChiefdom');
        // var prodMktDistrict = getInptValue('mktDistrict');
        // var prodMktRegion = getInptValue('mktRegion');
        // var prodMktEnumerator = getInptValue('mktEnumerator');
        // var prodName = getInptValue('mktProductName');
        // var prodMktWHS_Unit = getInptValue('WHS_Unit');
        // var prodMktWHS_Weight = parseInt(getInptValue('WHS_Weight'));
        // var prodMktWHS_Price = parseInt(getInptValue('WHS_Price'));
        // var prodMktRET_Unit = getInptValue('RET_Unit');
        // var prodMktRET_Weight = parseInt(getInptValue('RET_Weight'));
        // var prodMktRET_Price = parseInt(getInptValue('RET_Price'));

        // ajax request to make a new product
        $.ajax({
            type: 'POST',
            url: '/inputMarketData',
            data: {
                mktLocality: prodMktLocality,
                mktChiefdom: prodMktChiefdom,
                mktDistrict: prodMktDistrict,
                mktRegion: prodMktRegion,
                mktEnumerator: prodMktEnumerator,
                mktProductName: prodName,
                WHS_Unit: prodMktWHS_Unit,
                WHS_Weight: prodMktWHS_Weight,
                WHS_Price: prodMktWHS_Price,
                RET_Unit: prodMktRET_Unit,
                RET_Weight: prodMktRET_Weight,
                RET_Price: prodMktRET_Price
            },
            success: function(response) {

            }
        });
    });


    // show submitAlert
    document.querySelector('.submitAlert').style.display = 'block';

    // hide submitAlert after 3 seconds
    setTimeout(function() {
        document.querySelector('.submitAlert').style.display = 'none';
    }, 3000);

    // clear form
    document.getElementById('productMarketForm').reset();
}

// function to get form inputs
function getInptValue(id) {
    return document.getElementById(id).value;
}

// SEND AND SAVE MESSAGE TO FIREBASE FUNCTION
function saveMarketData(locality, chiefdom, district, region, enumerator, date, product, WHS_Unit, WHS_Weight, WHS_Price, RET_Unit, RET_Weight, RET_Price) {
    var newProdMarketRef = prodMarketRef.push()

    newProdMarketRef.set({
        locality: locality,
        chiefdom: chiefdom,
        district: district,
        region: region,
        enumerator: enumerator,
        date: date,
        product: product,
        wholesale_unit: WHS_Unit,
        wholesale_weight: WHS_Weight,
        wholesale_price: WHS_Price,
        retail_unit: RET_Unit,
        retail_weight: RET_Weight,
        retail_price: RET_Price

    });
}