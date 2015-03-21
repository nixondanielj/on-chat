(function(){
    angular.module('OnChat').controller('ChatController', ['$routeParams', function($routeParams){
        this.message = 'Hello from group ' + $routeParams.groupId + '!';
    }]);
})();