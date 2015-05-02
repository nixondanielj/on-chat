var express = require('express');
var ctrl = express.Router();
var msgSvc = require('../services/message');

ctrl
    .route('/:channelName')
    .get(function(req, res){
        msgSvc.getByChannel(req.params.channel, req.user)
            .then(function(messages){
                res.json(messages);
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