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
            .when('/videos/tags', {
                templateUrl  : 'views/Video/Tags',
                controller   : 'VideoStatsCtrl',
                controllerAs : 'vm'
            })
            .when('/videos/tagless', {
                templateUrl  : 'views/Video/Tagless',
                controller   : 'VideoTaglessCtrl',
                controllerAs : 'vm'
            })
            .when('/videos/quartile', {
                templateUrl  : 'views/Video/Quartile',
                controller   : 'VideoQuartileCtrl',
                controllerAs : 'vm'
            })
            .when('/tags', {
                templateUrl  : 'views/Tags/Index',
                controller   : 'TagCtrl',
                controllerAs : 'vm'
            })
            .when('/tags/top', {
                templateUrl  : 'views/Tags/Top',
                controller   : 'TagTopCtrl',
                controllerAs : 'vm'
            })
            .when('/tags/length', {
                templateUrl  : 'views/Tags/Length',
                controller   : 'TagLengthCtrl',
                controllerAs : 'vm'
            })
            .when('/overlap/full', {
                templateUrl  : 'views/Overlap/Full',
                controller   : 'OverlapFullCtrl',
                controllerAs : 'vm'
            })
            .when('/overlap/full/tag', {
                templateUrl  : 'views/Overlap/Full/Tag',
                controller   : 'OverlapFullTagCtrl',
                controllerAs : 'vm'
            })
            .when('/overlap/full/other', {
                templateUrl  : 'views/Overlap/Full/Other',
                controller   : 'OverlapFullOtherCtrl',
                controllerAs : 'vm'
            })
            .when('/overlap/small', {
                templateUrl  : 'views/Overlap/Small',
                controller   : 'OverlapSmallCtrl',
                controllerAs : 'vm'
            })
            .when('/overlap/small/tag', {
                templateUrl  : 'views/Overlap/Small/Tag',
                controller   : 'OverlapSmallTagCtrl',
                controllerAs : 'vm'
            })
            .when('/overlap/small/other', {
                templateUrl  : 'views/Overlap/Small/Other',
                controller   : 'OverlapSmallOtherCtrl',
                controllerAs : 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }
})();