(function(){
    angular.module('OnChat').directive('ocContactBar', [function(){
        return {
            restrict: 'E',
            templateUrl: 'views/contact-bar.html',
            controller: [function(){
                this.topics = ['#design', '#development'];
                this.users = ['@jeff', '@sarah', '@dan', '@dani', '@john'];
                this.teams = ['&teh_devs', '&design'];
            }],
            controllerAs: 'contactCtrl'
        };
    }]);
})();