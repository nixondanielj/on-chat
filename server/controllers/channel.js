var express = require('express');
var Channel = require('../models/channel');
var ctrl = express.Router();
var q = require('q');


ctrl
    .route('/')
    .get(function(req, res){
        // map channel rels to an array of promises that resolve to vms
        var vmPromises = req.user.channels.map(function(channelRel){
            var channelVMPromise = q.defer();
            Channel.findById(channelRel.channel, function(err, channel){
                if(err){
                    channelVMPromise.reject(err);
                } else {
                    // fill channel up with extra view data
                    channel.name = channelRel.name || channel.name;
                    channel.activity = channelRel.activity;
                    
                    // clear unnecessary data
                    delete channel.admins;
                    
                    channelVMPromise.resolve(channel);
                }
            });
            return channelVMPromise.promise;
        });
        // all good? send the vms
        q.all(vmPromises).then(function(vms){
            res.json(vms);
        }, function(err){
            console.error(err);
            res.sendStatus(500);
        });
    })
    .post(function(req, res){
        
    })
    .put(function(req, res){
        
    })
    .delete(function(req, res){
        
    });

module.exports = ctrl;