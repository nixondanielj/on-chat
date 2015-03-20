var app = angular.module('OnChat', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeController',
            controllerAs: 'homeCtrl'
        })
        .when('/chat/:groupId', {
            templateUrl: 'chat/chat.html',
            controller: 'ChatController',
            controllerAs: 'chatCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);