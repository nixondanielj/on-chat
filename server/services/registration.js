var userRepo = require('../repositories/user');
var q = require('q');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var Channel = require('../models/channel');
var channelRepo = require('../repositories/channel');
var config = require('../config/config');

var svc = {};
svc.checkForDuplicate = function(email) {
    var d = q.defer();
    userRepo.findByEmail(email).then(function(user){
        if(user.length){
            d.reject('duplicate');
        } else {
            d.resolve();
        }
    }, function(err){
        d.reject(err);
    });
    return d.promise;
};

svc.register = function(email, password){
    var d = q.defer();
    this.checkForDuplicate(email)
        .then(function(){
            return createUser(email, password);
        })
        .then(addUserToUserChannels)
        .then(function(user){
            d.resolve(user);
        }, function(err){
            console.error(err);
            d.reject(err);
        });
    return d.promise;
};

// either checkPassword doesn't belong here, or this service is misnamed
// placed it here because it keeps all of the dependency on bcrypt in
// one place
svc.checkPassword = function(user, password){
    return bcrypt.compareSync(password, user.local.password);
};

// private

var createUser = function (email, password){
    var user = new User();
    user.local.email = email;
    user.local.password = getHash(password);
    user.local.displayName = email.slice(0, email.lastIndexOf('@'));
    return userRepo.upsert(user);
};

// TODO - factor out an "addUserToChannel" or something
var addUserToUserChannels = function(user){
    var d = q.defer();
    userRepo.getAll().then(function(users){
        var uPromises = [];
        users.forEach(function(u){
            if(u.id !== user.id){
                var uPromise = q.defer();
                uPromises.push(uPromise.promise);
                var channel = new Channel();
                channel.name = u.getName() + ' AND ' + user.getName();
                channel.type = config.channelTypes.user;
                channelRepo.upsert(channel).then(function(channel){
                    user.channels.push({
                        channel: channel,
                        name: u.getName(),
                        type: channel.type
                    });
                    u.channels.push({
                        channel: channel,
                        name: user.getName(),
                        type: channel.type
                    });
                    uPromise.resolve(userRepo.upsert(u));
                }, uPromise.reject);
            }
        });
        // need to implement rollback in case of error
        q.all(uPromises).done(function(users){
            d.resolve(userRepo.upsert(user));
        }, function(err){
            d.reject(err);
        });
    }, function(err){
        d.reject(err);
    });
    return d.promise;
};

var getHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = svc;