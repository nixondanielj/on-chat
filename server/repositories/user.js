var User = require('../models/user');
var q = require('q');

var repo = {};
repo.findByEmail = function(email){
    var d = q.defer();
    User.find({ 'local.email' : email }, function(err, users){
        if(err){
            d.reject(err);
        } else {
            d.resolve(users);
        }
    });
    return d.promise;
};

repo.upsert = function(user){
    var d = q.defer();
    user.save(function(err, user){
        if(err){
            d.reject(err);
        } else {
            d.resolve(user);
        }
    });
    return d.promise;
};

repo.getAll = function(){
    var d = q.defer();
    User.find({}, function(err, users){
        if(err){
            d.reject(err);
        } else {
            d.resolve(users);
        }
    });
    return d.promise;
};

module.exports = repo;