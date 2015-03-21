(function(){
    angular.module('OnChat').directive('ocChatWindow', [function(){
        return {
            restrict: 'E',
            templateUrl: 'views/chat-window.html',
            controller: [function(){
                this.message = '';
                this.messageGroups = [
                    { 
                        messages: [ 
                            { text: 'test', sent: new Date() },
                            { text: 'test1', sent: new Date() }
                        ],
                        sender: 'dan.nixon'
                    }, 
                    { 
                        messages: [
                            { text: 'test2', sent: new Date() }
                        ],
                        sender: 'dani.reinking'
                    }
                ];
                this.post = function(message){
                    if(message && message.trim()) {
                        this.messageGroups[0].messages.push({ text: message.trim(), sent: new Date() });
                        this.message = '';
                    }
                };
            }],
            controllerAs: 'chatCtrl'
        };
    }]);
})();