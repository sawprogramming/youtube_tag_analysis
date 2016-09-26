(function () {
    'use strict';

    angular
        .module('YTT')
        .factory('OverlapSvc', OverlapService);

    OverlapService.$inject = ['$http'];

    function OverlapService($http) {
        var service = {
            GetVideoOverlap : GetVideoOverlap
        };
        return service;

        ///////////////////////////////////////////////////////////////////////////
        function GetVideoOverlap() {
            return $http({
                method : 'GET',
                url    : 'api/overlap/videos'
            });
        }
    }
})();