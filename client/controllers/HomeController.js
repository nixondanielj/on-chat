(function(angular, config){
    angular.module('OnChat').controller(
        'HomeController', 
        ['AuthService', '$mdToast', '$location', 'UserService',
        function(authSvc, $mdToast, $location, userSvc){
            this.loading = false;
            var ctrl = this;
            var loadingFor = function(promise){
                if(!ctrl.loading){
                    ctrl.loading = true;
                    promise.finally(function(){
                        ctrl.loading = false;
                    });
                }
            };
            
            this.signin = function(email, password){
                loadingFor(authSvc.authenticate(email, password)
                .then(function(){
                    $location.path('/chat/' + config.defaultChannel);
                }, function() {
                    $mdToast.show(
                        $mdToast.simple()
                        .content('Invalid Credentials')
                        .position('top'));
                }));
            };
            this.register = function(email, password){
                loadingFor(
                    userSvc.save({ 
                        email: email, 
                        password: password 
                    }).$promise.then(function(){
                    ctrl.signin(email, password);
                }, function(){
                    $mdToast.show(
                        $mdToast.simple()
                        .content('Error - failed to create user')
                        .position('top'));
                }));
            };
    }]);
})(window.angular, window.config);