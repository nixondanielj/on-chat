(function(angular){
    angular.module('OnChat').directive('ocChatWindow', [function(){
        return {
            restrict: 'E',
            templateUrl: 'views/chat-window.html',
            controller: ['MessageService', 'EventService', 'ChannelService',
            function(msgSvc, evtSvc, channelSvc){
                var ctrl = this;
                
                ctrl.channel = channelSvc.currentChannel;
                
                ctrl.loading = true;
                
                evtSvc.onClient('channel-changed', function(channel){
                    ctrl.loading = false;
                    ctrl.channel = channel.name;
                });
                
                evtSvc.onServer('message-received', function(message){
                    if(ctrl.messageGroups.length > 0){
                        var lastGroup = 
                            ctrl.messageGroups[ctrl.messageGroups.length - 1];
                        // if same sender, add to last group, else create group
                        if(lastGroup.sender === message.sender){
                            lastGroup.messages.push(message);
                        } else {
                            ctrl.messageGroups.push({
                                sender: message.sender,
                                messages: [message]
                            });
                        }
                    }
                });
                
                ctrl.message = '';
                ctrl.post = function(message){
                    message = message.trim();
                    if(message) {
                        msgSvc.send(message);
                        ctrl.message = '';
                    }
                };
            }],
            controllerAs: 'chatCtrl'
        };
    }]);
})(window.angular);