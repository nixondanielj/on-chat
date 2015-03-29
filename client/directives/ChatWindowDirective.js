(function(angular){
    angular.module('OnChat').directive('ocChatWindow', [function(){
        return {
            restrict: 'E',
            templateUrl: 'views/chat-window.html',
            controller: ['MessageService', 'EventService', function(msgSvc, evtSvc){
                evtSvc.onServer('message-receive', function(message){
                    if(this.messageGroups.length > 0){
                        var lastGroup = 
                            this.messageGroups[this.messageGroups.length - 1];
                        // if same sender, add to last group, else create group
                        if(lastGroup.sender === message.sender){
                            lastGroup.messages.push(message);
                        } else {
                            this.messageGroups.push({
                                sender: message.sender,
                                messages: [message]
                            });
                        }
                    }
                });
                
                this.message = '';
                msgSvc.get().then(function(data){
                    this.messageGroups = data;
                });
                this.post = function(message){
                    message = message.trim();
                    if(message) {
                        msgSvc.send(message);
                        this.message = '';
                    }
                };
            }],
            controllerAs: 'chatCtrl'
        };
    }]);
})(window.angular);