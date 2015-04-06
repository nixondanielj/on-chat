var q = require('q');
var channelRepo = require('../repositories/channel');

var svc = {};

svc.getChannelsForUser = function(user){
    var needNames = {};
    var vms = [];
    var d = q.defer();
    // TODO - all this is a symptom of a problem with not assigning channelRels 
    // names by default from the channel object. We're really just tracking
    // down missing names
    user.channels.forEach(function(channelRel){
        var vm = {
            activity: channelRel.activity,
            name: channelRel.name,
            type: channelRel.type
        };
        if(!channelRel.name){
            needNames[channelRel.channel] = vm;
        }
        vms.push(vm);
    });
    channelRepo.getByIds(Object.keys(needNames)).then(function(channels){
        channels.forEach(function(channel){
            needNames[channel.id].name = channel.name;
        });
        d.resolve(vms);
    }, d.reject);
    return d.promise;
};

module.exports = svc;