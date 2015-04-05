module.exports = function(authFunc) {
    var express = require('express');
    var ctrl = express.Router();
    var registrationSvc = require('../services/registration');
    
    ctrl.route('/')
        .post(function(req, res){
            var email = (req.body.email || '').trim(),
                password = (req.body.password || '').trim();
            // check params, 400 if bad
            if(!email || !password || email.indexOf('@') < 1) {
                res.sendStatus(400);
            } else {
                registrationSvc.checkForDuplicate(email)
                    .then(function(){
                        registrationSvc.register(email, password)
                            .then(function(user){
                                console.log('created user ' + user.email);
                                res.sendStatus(201);
                            });
                    }, function(){
                        res.sendStatus(409);
                    });
            }
        });
    
    ctrl.route('/:userId')
        .all(authFunc);
    return ctrl;
};

