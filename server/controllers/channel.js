var express = require('express');
var User = require('../models/user');
var Channel = require('../models/channel');
var ctrl = express.Router();

ctrl
    .route('/')
    .get(function(req, res){
        User.populate(
            req.user, 
            { path: 'activeChannels inactiveChannels' },
            function(err, user){
                if(err){
                    console.error(err);
                    return res.sendStatus(500);
                }
                user.inactiveChannels.forEach(function(ic){
                    ic.active = false;
                });
                user.activeChannels.forEach(function(ac){
                    ac.active = true;
                });
                res.json(user.activeChannels.concat(user.inactiveChannels));
            });
    })
    .post(function(req, res){
        
    })
    .put(function(req, res){
        
    })
    .delete(function(req, res){
        
    });

module.exports = ctrl;