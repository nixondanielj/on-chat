(function(angular, io){
    angular.module('OnChat').service('EventService', ['$rootScope', function($rootScope){
        var socket = io.connect();
        
        var svc = {};
        svc.toServer = function(name, data){
            socket.emit(name, data);
        };
        svc.onServer = function(name, handler){
            socket.on(name, handler);
        };
        svc.toClient = function(name, data){
            $rootScope.$emit(name, data);
        };
        svc.onClient = function(name, handler){
            $rootScope.$on(name, handler);
        };
        return svc;
    }]);
})(window.angular, window.io);