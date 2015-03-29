var express = require('express');
var controller = express.Router();
var User = require('../models/User');

controller
    .route('/')
    .post(function(request, response){
        var email = (request.body.email || '').trim(),
            password = (request.body.password || '').trim();
        if(email
            && password
            && email.indexOf('@onshoreoutsourcing.com') > 0) {
            User.findOne({ email: email }, function(err, user){
                if(err){
                    console.log(err);
                    response.sendStatus(500);
                } else {
                    if(user){
                        console.log('User already exists');
                        response.sendStatus(409);
                    } else {
                        new User({ 
                            email: email, 
                            password: password, 
                            displayName: email.slice(0, email.lastIndexOf('@'))
                        }).save(function(err, user){
                            if(err){
                                console.log('failed to create user');
                                console.error(err);
                                response.sendStatus(500);
                            } else {
                                response.sendStatus(201);
                            }
                        });
                    }
                }
            });
        } else {
            response.sendStatus(400);
        }
    });

module.exports = controller;