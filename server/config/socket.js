module.exports = function(io, cookieParser, sessionStore, config){
    
    var socketPassport = require('passport.socketio');
    io.set('authorization', socketPassport.authorize({
        cookieParser: cookieParser,
        key: config.key,
        secret: config.secret,
        store: sessionStore,
        success: function(data, accept){
            console.log('Socket connection authenticated');
            accept(null, true);
        },
        error: function(data, message, error, accept){
            console.log('Socket connection authentication failed');
            console.log(message);
            
            // if there was a real error
            if(error) {
                accept(new Error(message));
            }
            
            // if user was unauthorized
            accept(null, false);
        }
    }));
    io.on('connection', function(socket){
        console.log('socket connected');
    });
    /*
    require('../socket/message')(io);
    require('../socket/channel')(io);*/
};