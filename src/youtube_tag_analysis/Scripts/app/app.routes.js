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
            .when('/distribution', {
                templateUrl: 'views/Distribution/Index',
                controller: 'DistributionCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }
})();