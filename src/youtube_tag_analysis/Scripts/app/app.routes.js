(function () {
    'use strict';

    angular
        .module('YTT')
        .config(RouteConfig);

    RouteConfig.$inject = ['$routeProvider', '$locationProvider'];

    ///////////////////////////////////////////////////////////////////////////
    function RouteConfig($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl  : 'views/Home/Index',
                controller   : 'HomeCtrl',
                controllerAs : 'vm'
            })
            .when('/videos', {
                templateUrl  : 'views/Video/Index',
                controller   : 'VideoStatsCtrl',
                controllerAs : 'vm'
            })
            .when('/tags', {
                templateUrl  : 'views/Tags/Index',
                controller   : 'TagCtrl',
                controllerAs : 'vm'
            })
            .when('/overlap', {
                templateUrl  : 'views/Overlap/Index',
                controller   : 'OverlapCtrl',
                controllerAs : 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }
})();