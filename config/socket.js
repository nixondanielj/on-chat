module.exports = function(io, cookieParser, sessionStore, config){
    var socketPassport = require('passport.socketio');
    io.set('authorization', socketPassport.authorize({
        cookieParser: cookieParser,
        key: config.key,
        secret: config.secret,
        store: sessionStore,
        success: function(data, accept){
            accept(null, true);
        },
        error: function(data, message, error, accept){
            if(error){
                accept(new Error(message));
            } else {
                accept(null, false);
            }
        }
    }));
};