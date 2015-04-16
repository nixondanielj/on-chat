(function(angular){
    angular.module('OnChat')
        .service('MessageService', 
        ['EventService', 'ChannelService', '$http', 
        function(evtSvc, channelSvc, $http){
        
        var svc = {};
        svc.send = function(message){
            if(message){
                message = {
                    text: message.trim(),
                    channel: channelSvc.currentChannel
                };
                evtSvc.toServer('message-send', message);
            }
        };
        svc.get = function(){
            return $http.get('/messages/' + channelSvc.currentChannel).$promise;
        };
        return svc;
    }]);
})(window.angular);