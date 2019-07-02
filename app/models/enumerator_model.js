const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const enumeratorSchema = mongoose.Schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    firstName:  {
        type: String
    },
    lastName:  {
        type: String
    },
    username:  {
        type: String
    },
    email:  {
        type: String
    },
    address:  {
        type: String
    },
    city:  {
        type: String
    },
    state: {
        type: String
    },
    zipCode:  {
        type: String
    }, 
    password:  {
        type: String
    }
});

//exporting the model
var Enumerator = module.exports = mongoose.model('Enumerators', enumeratorSchema);

module.exports.createEnumerator = function(newEnumerator, callback){
    // hashing the password
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newEnumerator.password, salt, function(err, hash){
            newEnumerator.password = hash;
            newEnumerator.save(callback);
        });
    });
}

//get enumerator function
module.exports.getEnumeratorByUsername = function(username, callback){
    var query = {username: username};
    Enumerator.findOne(query, callback);
}

//get enumerator function
module.exports.getEnumeratorById = function(id, callback){
    Enumerator.findById(id, callback);
}

//compare password function
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}

 
