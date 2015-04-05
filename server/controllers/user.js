module.exports = function(authFunc) {
    var express = require('express');
    var User = require('../models/user');
    var ctrl = express.Router();
    var Channel = require('../models/channel');
    var q = require('q');
    var config = require('../config/config');
    
    ctrl.route('/')
        .post(function(req, res){
            var email = (req.body.email || '').trim(),
            password = (req.body.password || '').trim();
            // check params, 400 if bad
            if(!email || !password || email.indexOf('@') < 1) {
                res.sendStatus(400);
            } else {
                // TODO - fix when we add more auth methods...
                User.findOne({ "local.email": email }, function(err, user){
                    if(err){
                        console.log(err);
                        res.sendStatus(500);
                    } else if(user){
                        console.log('User already exists');
                        res.sendStatus(409);
                    } else {
                        var newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = newUser.getHash(password);
                        newUser.local.displayName = 
                            email.slice(0, email.lastIndexOf('@'));
                        saveUser(newUser).then(function(newUser){
                            addDefaultChannels(newUser)
                                .then(function(newUser){
                                    console.info('created user ' 
                                        + newUser.getName());
                                    res.sendStatus(201);
                                }, function(err){
                                    console.log('failed in default chanel creation');
                                    console.log(err);
                                    res.sendStatus(500);
                                });
                        }, function(err){
                            console.log('failed to create user');
                            console.error(err);
                            res.sendStatus(500);
                        });
                    }
                });
            }
        });
        
    // we're in promise hell here, this needs a rewrite...
    function addDefaultChannels(user){
        var deferred = q.defer();
        User.find({}, function(err, users){
            if(err){
                console.error('error getting all users');
                deferred.reject(err);
            }
            // collects promises for saves of iterated users
            var userSavePromises = [];
            users.forEach(function(u){
                if(user.id !== u.id) {
                    var userSavePromise = q.defer();
                    userSavePromises.push(userSavePromise.promise);
                    // wrapping this creation in a promise might improve clarity
                    Channel.create({
                        // this name should never be displayed...
                        name: u.getName() + ' AND ' + user.getName(),
                        type: config.channelTypes.user
                    }, function(err, channel){
                        if(err){
                            console.error('failed to create channel');
                            userSavePromise.reject(err);
                        } else {
                            user.channels.push({
                                channel: channel,
                                name: u.getName()
                            });
                            u.channels.push({
                                channel: channel,
                                name: user.getName()
                            });
                            saveUser(u).then(userSavePromise.resolve, 
                                userSavePromise.reject);
                        }
                    });
                }
            });
            
            // handle completion of all user saves
            // if all good, save registering user
            q.all(userSavePromises).then(function(users){
                console.info(user.channels);
                saveUser(user).then(function(user){
                    deferred.resolve(user);
                }, function(err){
                    console.error('registered user channel save fail');
                    deferred.reject(err);
                });
            }, function(err){
                // need to implement some kind of rollback here
                // currently an error would leave "partial" channels floating
                console.error('one of the user saves failed');
                deferred.reject(err);
            });
        });
        return deferred.promise;
    }
    
// helpers
    
    // wraps user creation in a promise
    function saveUser(user){
        var deferred = q.defer();
        user.save(function(err, user){
            if(err){
                console.error('error saving ' + user.local.email);
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }
    
    ctrl.route('/:userId')
        .all(authFunc);
    return ctrl;
};

