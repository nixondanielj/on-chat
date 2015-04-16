var Message = require('../models/message');
var channelRepo = require('../repositories/channel');
var msgRepo = require('../repositories/message');
var channelSvc = require('channel');
var q = require('q');

var svc = {};

// TODO - currently assuming user has perm to post in channel. Is this always true?
svc.save = function(message){
    var d = q.defer();
    channelSvc.getChannelsForUser(message.sender).then(function(channels){
        var channel = (channels.filter(function(c){
            return c.name == message.channel;
        }) || [null])[0];
        if(!channel){
            console.error('found ' + channel);
            d.reject('could not find channel');
        } else {
            msgRepo.upsert(new Message({
                text: message.text,
                sender: message.sender
            })).then(function(message){
                channel.messages.push(message);
                channelRepo.upsert(channel).then(function(channel){
                    d.resolve({
                        id: message.id,
                        text: message.text,
                        sender: message.sender.getName(),
                        date: message.date
                    });
                }, d.reject);
            }, d.reject);
        }
    }, d.reject);
    return d.promise;
};

module.exports = svc;