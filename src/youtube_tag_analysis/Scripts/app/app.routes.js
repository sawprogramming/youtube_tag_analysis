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
                templateUrl: 'views/Home/Index',
                controller: 'HomeCtrl'
            })
            .when('/videos', {
                templateUrl: 'views/Video/Index',
                controller: 'VideoStatsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }
})();