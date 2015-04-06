var express = require('express');
var channelSvc = require('../services/channel');
var ctrl = express.Router();

ctrl
    .route('/')
    .get(function(req, res){
        channelSvc.getChannelsForUser(req.user)
            .then(function(channels){
                res.json(channels);
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