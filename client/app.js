(function(){
    var app = angular.module('OnChat', ['ngRoute', 'ngMaterial']);
    
    app.config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController',
                controllerAs: 'homeCtrl'
            })
            .when('/chat/:groupId', {
                templateUrl: 'views/chat.html',
                controller: 'ChatController',
                controllerAs: 'chatCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        $mdThemingProvider.theme('default')
            .accentPalette('green');
    }]);
})();