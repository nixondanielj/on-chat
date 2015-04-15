var Channel = require('../models/channel');
var q = require('q');
var config = require('../config/config')

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

repo.getBoards = function(){
    var d = q.defer();
    Channel.find({ type: config.channelTypes.board }, function(err, channels){
        if(err){
            d.reject(err);
        } else {
            d.resolve(channels);
        }
    });
    return d.promise;
};

repo.getByIds = function(ids){
    var d = q.defer();
    Channel.find({
        '_id': {
            $in: ids
        }
    }, function(err, channels){
        if(err){
            d.reject(err);
        } else {
            d.resolve(channels);
        }
    });
    return d.promise;
};

module.exports = repo;