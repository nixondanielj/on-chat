(function(angular, config){
    angular.module('OnChat').controller('ChatController', 
    ['$routeParams', 'ChannelService', '$location',
    function($routeParams, channelSvc, $location){
        var chanId = $routeParams.channelId;
        if(chanId){
            channelSvc.setChannel(chanId);
        } else {
            $location.path('/chat/' + config.defaultChannel);
        }
    }]);
})(window.angular, window.config);