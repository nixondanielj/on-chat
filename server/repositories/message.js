var q = require('q');

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

module.exports = repo;