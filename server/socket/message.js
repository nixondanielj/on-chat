var msgSvc = require('../services/message');

module.exports = function(io){/*
    io.on('connection', function(socket){
        console.log('io connect from messages')
        socket.on('message-send', function(message){
            if(socket.request.user 
                && socket.request.user.logged_in
                && socket.channel){
                msgSvc.save({
                    text: message,
                    sender: socket.request.user,
                    channel: socket.channel
                }).then(function(msg){
                    io.to(socket.channel).emit(msg);
                }, function(err){
                    sError(err);
                });
            } else {
                sError('not authed');
            }
        });
    });
    // TODO remove
    function sError(err){
        console.error(err);
        io.emit('error', err);
    }*/
    var svc = {};
    
    return svc;
};