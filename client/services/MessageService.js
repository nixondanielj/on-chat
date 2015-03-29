(function(angular){
    angular.module('OnChat')
        .service('MessageService', ['EventService', '$http', function(evtSvc, $http){
        
        // service construction
        var svc = {};
        svc.send = function(message){
            evtSvc.toServer('message-send', message);
        };
        svc.get = function(){
            return $http.get('/messages/' + svc.channel.substr(1));
        };
        svc.channel = '#main';
        return svc;
    }]);
})(window.angular);