var mongoose = require('mongoose');

var tradeFlowSchema = mongoose.Schema({
    locality: {
        type: String,
        required: true
    },
    chiefdom: {
        type: String
    },
    district: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    enumerator: {
        type: String,
        required: true
    },
    locality_from: {
        type: String,
        required: true
    },
    chiefdom_from: {
        type: String,
        required: true
    },
    district_from: {
        type: String,
        required: true
    },
    country_from:  {
        type: String,
        required: true
    },
    locality_to: {
        type: String,
        required: true
    },
    chiefdom_to:  {
        type: String,
        required: true
    },
    district_to: {
        type: String,
        required: true
    },
    country_to: {
        type: String,
        required: true
    },
    date:  {
        type: Date,
        default: Date.now()
    }
    
});

module.exports =  mongoose.model('tradeFlowData', tradeFlowSchema);
