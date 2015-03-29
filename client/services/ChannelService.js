(function(angular, config){
    angular.module(config.appName).service('ChannelService',
    ['$resource',
    function($resource){
        var svc = $resource('/channel');
        return svc;
    }]);
})(window.angular, window.config);