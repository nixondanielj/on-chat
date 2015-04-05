var express = require('express');
var User = require('../models/user');
var Channel = require('../models/channel');
var ctrl = express.Router();

ctrl
    .route('/')
    .get(function(req, res){
        User.populate(
            req.user, 
            { 
                path: 'channels' ,
                options: {
                    sort: {
                        'activity': 1
                    }
                }
            },
            function(err, user){
                if(err){
                    console.error(err);
                    return res.sendStatus(500);
                }
                res.json(user.channels);
            });
    })
    .post(function(req, res){
        
    })
    .put(function(req, res){
        
    })
    .delete(function(req, res){
        
    });

module.exports = ctrl;