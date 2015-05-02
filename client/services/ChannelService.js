(function(angular, config){
    angular.module(config.appName).service('ChannelService',
    ['$resource', 'EventService',
    function($resource, evtSvc){
        var svc = $resource('/channel');
        svc.currentChannel = '';
        svc.setChannel = function(newChannel){
            evtSvc.toServer('channel-change', newChannel);
        };
        evtSvc.onServer('channel-changed', function(newChannelId){
            evtSvc.toClient('channel-changed', newChannelId);
            svc.currentChannel = newChannelId;
        });
        return svc;
    }]);
})(window.angular, window.config);