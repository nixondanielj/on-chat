var q = require('q');
var Message = require('../models/message');

var repo = {};

repo.upsert = function(message){
    var d = q.defer();
    message.save(function(err, channel){
        if(err){
            d.reject(err);
        } else {
            d.resolve(channel);
        }
    });
    return d.promise;
};

repo.getByIds = function(ids, includes){
    var d = q.defer();
    Message.find({
        '_id': {
            $in: ids
        }
    }).populate(includes).exec(function(err, messages){
        if(err){
            d.reject(err);
        } else {
            d.resolve(messages);
        }
    });
    return d.promise;
};

module.exports = repo;