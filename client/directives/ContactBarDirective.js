(function(angular, config){
    angular.module('OnChat').directive('ocContactBar', [function(){
        return {
            restrict: 'E',
            templateUrl: 'views/contact-bar.html',
            controller: ['ChannelService', function(channelSvc){
                var ctrl = this;
                this.boards = [];
                this.users = [];
                this.teams = [];
                this.loading = true;
                channelSvc.query().$promise.then(function(channels){
                    channels.forEach(function(channel){
                        switch(channel.type){
                            case config.channelTypes.board:
                                ctrl.boards.push(channel);
                                break;
                            case config.channelTypes.user:
                                ctrl.users.push(channel);
                                break;
                            case config.channelTypes.team:
                                ctrl.teams.push(channel);
                                break;
                        }
                    });
                    ctrl.loading = false;
                });
            }],
            controllerAs: 'contactCtrl'
        };
    }]);
})(window.angular, window.config);