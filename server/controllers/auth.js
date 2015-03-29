module.exports = function(authFunc, passport) {
    var ctrl = require('express').Router();
    ctrl
        .route('/')
        .get(authFunc, function(req, res, next){
            res.sendStatus(200);
        })
        .post(passport.authenticate('local'), function(req, res, next){
            if(req.isAuthenticated()){
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }
        });
    return ctrl;
};