(function(angular){
    angular.module('OnChat').service('AuthService', 
    ['$http', '$q', 
    function($http, $q){
        var svc = {};
        svc.authenticate = function(email, password){
            return $http.post('/auth', { email: email, password: password });
        };
        svc.check = function(){
            var deferred = $q.defer();
            $http.get('/auth').then(function(){
                deferred.resolve({ authenticated: true });
            }, function(){
                deferred.reject({ authenticated: false });
            });
            return deferred.promise;
        };
        return svc;
    }]);
})(window.angular);