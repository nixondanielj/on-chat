var express = require('express');
var User = require('../models/user');
var ctrl = express.Router();

ctrl
    .route('/')
    .get(function(req, res){
        User.populate
            req.user, 
            { path: 'activeChannels inactiveChannels' }
            function(err, user){
                if(err){
                    console.error(err)
                }
            });
    })
    .post(function(req, res){
        
    })
    .put(function(req, res){
        
    })
    .delete(function(req, res){
        
    });

module.exports = ctrl;