// INITALIZING FARMERS DATA TABLE / COLLECTION REFERENCE
var connectedRef = firebase.database().ref(".info/connected"); // will holds the offline data
var prodTradeFlowRef = firebase.database().ref('productTradeFlowData');

// setting the database app persistence for offline cache storage
// FirebaseDatabase.service.setPersistenceEnabled( true );

// this event listener is listening for a form submit
document.getElementById('productTradeFlowForm').addEventListener('submit', submitProductTradeForm);

// submitFarmersForm function
function submitProductTradeForm(e) {

    //preventing the form from submit automatically
    e.preventDefault();

    // getting the values
    var tradeFlowProductName = getInptValue('product');
    var tradeFlowQuantity = getInptValue('tonage');
    var tradeFlowPrice = getInptValue('value');
    var tradeFlowEnumerator = getInptValue('enumerator');
    var tradeFlowDate = getInptValue('date');
    var tradeFlowLocalityFROM = getInptValue('locality_from');
    var tradeFlowChiefdomFROM = getInptValue('chiefdom_from');
    var tradeFlowDistrictsFROM = getInptValue('district_from');
    var tradeFlowCountryFROM = getInptValue('country_from');
    var tradeFlowLocalityTO = getInptValue('locality_to');
    var tradeFlowChiefdomTO = getInptValue('chiefdom_to');
    var tradeFlowDistrictsTO = getInptValue('district_to');
    var tradeFlowCountryTO = getInptValue('country_to');

    connectedRef.on("value", function(snap) {
        if (snap.val() === true) {
            console.log("connected");
            //calling the send and save data
            saveProdTradeData(tradeFlowProductName, tradeFlowQuantity, tradeFlowPrice, tradeFlowEnumerator, tradeFlowDate,
                tradeFlowLocalityFROM, tradeFlowChiefdomFROM, tradeFlowDistrictsFROM, tradeFlowCountryFROM,
                tradeFlowLocalityTO, tradeFlowChiefdomTO, tradeFlowDistrictsTO, tradeFlowCountryTO);
        } else {
            console.log("not connected");
        }
    });

    // show submitAlert
    document.querySelector('.submitAlert').style.display = 'block';

    // hide submitAlert after 3 seconds
    setTimeout(function() {
        document.querySelector('.submitAlert').style.display = 'none';
    }, 3000);

    // show errorAlert
    document.querySelector('.errorAlert').style.display = 'block';

    // hide errorAlert after 3 seconds
    setTimeout(function() {
        document.querySelector('.errorAlert').style.display = 'none';
    }, 3000);

    // clear form
    document.getElementById('productTradeFlowForm').reset();
}

// function to get form inputs
function getInptValue(id) {
    return document.getElementById(id).value;
}

// SEND AND SAVE DATA TO FIREBASE FUNCTION
function saveProdTradeData(tradeFlowProductName, tradeFlowQuantity, tradeFlowPrice, tradeFlowEnumerator, tradeFlowDate,
    tradeFlowLocalityFROM, tradeFlowChiefdomFROM, tradeFlowDistrictsFROM, tradeFlowCountryFROM,
    tradeFlowLocalityTO, tradeFlowChiefdomTO, tradeFlowDistrictsTO, tradeFlowCountryTO) {
    var newProdTradeFlowRef = prodTradeFlowRef.push()

    newProdTradeFlowRef.set({
        product: tradeFlowProductName,
        tonage: tradeFlowQuantity,
        value: tradeFlowPrice,
        enumerator: tradeFlowEnumerator,
        date: tradeFlowDate,
        locality_from: tradeFlowLocalityFROM,
        chiefdom_from: tradeFlowChiefdomFROM,
        district_from: tradeFlowDistrictsFROM,
        country_from: tradeFlowCountryFROM,
        locality_to: tradeFlowLocalityTO,
        chiefdom_to: tradeFlowChiefdomTO,
        district_to: tradeFlowDistrictsTO,
        country_to: tradeFlowCountryTO

    });
}