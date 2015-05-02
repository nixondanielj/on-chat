var channelSvc = require('../services/channel');


module.exports = function(io){
    
    // TODO remove
    function sError(err){
        console.error(err);
        io.emit('error', err);
    }
    
    io.on('connection', function(socket){
        console.log('socket connected');
        socket.on('channel-change', function(newChannel){
            if(socket.request.user && socket.request.user.logged_in){
                channelSvc.getChannelsForUser(socket.request.user).then(
                    function(channels){
                        channels = channels.filter(function(c){
                            return c.name === newChannel;
                        });
                        if(channels.length){
                            if(socket.channel){
                                socket.leave(socket.channel);
                            }
                            socket.join(channels[0].id);
                            socket.channel = channels[0].id;
                            socket.emit('channel-changed', socket.channel);
                        }
                    }, sError);
            } else {
                sError('not authed');
            }
        });
    });
};