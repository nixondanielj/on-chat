var Channel = require('../models/channel');
var config = require('../config/config');
var channelRepo = require('../repositories/channel');

module.exports = function(){
    channelRepo.getBoards().then(function(boards){
        if(!boards.length){
            Channel.create({
                name: 'announcements',
                type: config.channelTypes.board
            });
        }
    });
    
};