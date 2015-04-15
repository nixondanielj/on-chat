(function(angular, config){
    angular.module(config.appName).service('ChannelService',
    ['$resource', 'EventService',
    function($resource, evtSvc){
        var svc = $resource('/channel');
        svc.currentChannel = '';
        svc.setChannel = function(newChannel){
            svc.query().$promise.then(function(channels){
                channels = channels.filter(function(channel){
                    return channel.name === newChannel;
                });
                if(channels.length){
                    evtSvc.toClient('channel-changed', channels[0]);
                }
            });
        };
        return svc;
    }]);
})(window.angular, window.config);