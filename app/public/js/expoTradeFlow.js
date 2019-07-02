// INITALIZING FARMERS DATA TABLE / COLLECTION REFERENCE
var connectedRef = firebase.database().ref(".info/connected"); // will holds the offline data
var expoTradeFlowRef = firebase.database().ref('exportTradeFlowData');

// setting the database app persistence for offline cache storage
// FirebaseDatabase.service.setPersistenceEnabled( true );

// this event listener is listening for a form submit
document.getElementById('exportFlowForm').addEventListener('submit', submitExportTradeForm);

// submitExportTradeForm function
function submitExportTradeForm(e) {

    //preventing the form from submit automatically
    e.preventDefault();

    // getting the values
    var name = getInptValue('name');
    var email = getInptValue('email');
    var address = getInptValue('address');
    var phone = parseInt(getInptValue('phone'));
    var products = getInptValue('products');
    var weight = parseInt(getInptValue('weight'));
    var tonage = getInptValue('tonage');
    var value = parseInt(getInptValue('value'));
    var district = getInptValue('district');
    var region = getInptValue('region');
    var countryFROM = getInptValue('districtFrom');
    var countryTO = getInptValue('countryTO');
    var date = getInptValue('date');

    connectedRef.on("value", function(snap) {
        if (snap.val() === true) {
            console.log("connected");
            //calling the send and save data
            saveExpoTradeData(name, email, address, phone, products, weight, tonage, value, district, region, countryFROM, countryTO, date);
            // show submitAlert
            document.querySelector('.submitAlert').style.display = 'block';

            // hide submitAlert after 3 seconds
            setTimeout(function() {
                document.querySelector('.submitAlert').style.display = 'none';
            }, 3000);
        } else {
            console.log("not connected");
            // show errorAlert
            document.querySelector('.errorAlert').style.display = 'block';

            // hide errorAlert after 3 seconds
            setTimeout(function() {
                document.querySelector('.errorAlert').style.display = 'none';
            }, 3000);
        }
    });

    // clear form
    document.getElementById('exportFlowForm').reset();
}

// function to get form inputs
function getInptValue(id) {
    return document.getElementById(id).value;
}

// SEND AND SAVE DATA TO FIREBASE FUNCTION
function saveExpoTradeData(name, email, address, phone, products, weight, tonage, value, district, region, countryFROM, countryTO, date) {
    var newExpoTradeFlowRef = expoTradeFlowRef.push()

    newExpoTradeFlowRef.set({
        name: name,
        email: email,
        address: address,
        phone: phone,
        products: products,
        weight: weight,
        tonage: tonage,
        value: value,
        district: district,
        region: region,
        countryFROM: countryFROM,
        countryTO: countryTO,
        date: date

    });
}