(function(angular){
    angular.module('OnChat').service(
        'UserService', 
        ['$resource', 
        function($resource){
            var svc = $resource('/user');
            return svc;
        }]);
})(window.angular);