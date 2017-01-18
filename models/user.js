var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema;

var userSchema = new UserSchema({
    name: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String }
})

var User = module.exports = mongoose.model('User', userSchema);

// Hash and Salt
module.exports.createUser = function(newUser, callback){
        bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
             newUser.password = hash;
             newUser.save(callback)
        });
    });
} 

// Strategy-passport
module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function (err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}


