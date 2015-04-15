(function(angular){
    var app = angular.module('OnChat', ['ngRoute', 'ngMaterial', 'ngResource']);
    
    app.config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider){
        var auth = ['$q', 'AuthService', function($q, authSvc){
            return authSvc.check();
        }];
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController',
                controllerAs: 'homeCtrl'
            })
            .when('/chat/:channelId', {
                templateUrl: 'views/chat.html',
                controller: 'ChatController',
                controllerAs: 'chatCtrl',
                resolve: { auth: auth }
            })
            .otherwise({
                redirectTo: '/'
            });
        $mdThemingProvider.theme('default')
            .accentPalette('green');
    }]).run(['$rootScope', '$location', function($rootScope, $location){
        $rootScope.$on('$routeChangeError', function(evt, current, previous, eventObj){
            if(!eventObj.authenticated) {
                $location.path('/');
            }
        });
    }]);
})(window.angular);