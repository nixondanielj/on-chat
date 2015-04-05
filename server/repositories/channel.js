var Channel = require('../models/channel');
var q = require('q');

var repo = {};

repo.upsert = function(channel){
    var d = q.defer();
    channel.save(function(err, channel){
        if(err){
            d.reject(err);
        } else {
            d.resolve(channel);
        }
    });
    return d.promise;
};

module.exports = repo;