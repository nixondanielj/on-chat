var LocalStrategy = require('passport-local').Strategy;
var User = require('../server/models/user');

module.exports = function(passport){
    
    // serialization for session
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });
    
    passport.use('local', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // sends entire request to callback?
        },
        function(req, email, password, done){
            User.findOne({ 'local.email' : email }, function(err, user){
                if(err){
                    return done(err);
                } else if (!user){
                    return done(null, false);
                } else if (!user.checkPassword(password)) {
                    return done(null, false);
                } else {
                    return done(null, user);
                }
            });
        }));
};