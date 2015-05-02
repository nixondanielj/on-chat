var Message = require('../models/message');
var channelRepo = require('../repositories/channel');
var msgRepo = require('../repositories/message');
var channelSvc = require('./channel');
var q = require('q');

var svc = {};

svc.getByChannel = function(channelName, user){
    var d = q.defer();
    channelSvc.getChannelsForUser(user).then(function(channels){
        var channel = (channels.filter(function(c){
            return c.name === channelName;
        }) || [null])[0];
        if(!channel){
            d.reject('no such channel');
        } else {
            var ids = channel.messages.map(function(msg){
                return msg.id;
            });
            msgRepo.getByIds(ids, 'sender').then(function(messages){
                messages = messages.map(function(m){
                    return {
                        text: m.text,
                        date: m.date,
                        sender: m.sender.getName()
                    };
                });
                d.resolve(messages);
            }, d.reject);
        }
    }, d.reject);
    return d.promise;
};

// TODO - currently assuming user has perm to post in channel. Is this always true?
svc.save = function(message){
    var d = q.defer();
    channelSvc.getChannelsForUser(message.sender).then(function(channels){
        var channel = (channels.filter(function(c){
            return c.id === message.channel;
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