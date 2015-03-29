(function(angular, config){
    angular.module(config.appName).directive('channelList', [function(){
        return {
            restrict: 'E',
            templateUrl: '/views/channel-list.html',
            scope: {
                channels: '=',
                title: '@'
            },
            controller: [function(){
                this.showCount = 5;
                this.showMore = function(){
                    this.showCount += 5;
                };
            }],
            controllerAs: 'channelListCtrl'
        };
    }]);
})(window.angular, window.config);