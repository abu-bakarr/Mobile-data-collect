var mongoose = require('mongoose');

var marketSchema = mongoose.Schema({
    mktLocality:  {
        type: String,
        required: true
    },
    mktChiefdom:  {
        type: String
    },
    mktDistrict:  {
        type: String,
        required: true
    },
    mktRegion:  {
        type: String,
        required: true
    },
    mktEnumerator:  {
        type: String,
        required: true
    },
    mktProductName:  {
        type: String,
        required: true
    },
    WHS_Unit:  {
        type: String,
        required: true
    },
    WHS_Weight:  {
        type: Number,
        required: true
    },
    WHS_Price: {
        type: Number,
        required: true
    },
    RET_Unit:  {
        type: String,
        required: true
    },
    RET_Weight : {
        type: Number,
        required: true
    },
    RET_Price: {
        type: Number,
        required: true
    },
    date:  {
        type: Date,
        default: Date.now()
    },

    
});

module.exports =  mongoose.model('marketData', marketSchema);
