(function () {
    'use strict';

    angular
        .module('YTT')
        .factory('OverlapSvc', OverlapService);

    OverlapService.$inject = ['$http'];

    function OverlapService($http) {
        var service = {
            GetVideoOverlap   : GetVideoOverlap,
            GetMonthlyOverlap : GetMonthlyOverlap,
            GetYearlyOverlap  : GetYearlyOverlap
        };
        return service;

        ///////////////////////////////////////////////////////////////////////////
        function GetVideoOverlap() {
            return $http({
                method : 'GET',
                url    : 'api/overlap/videos'
            });
        }

        function GetMonthlyOverlap(year, month) {
            return $http({
                method: 'GET',
                url: 'api/overlap/videos/' + year + '/' + month
            });
        }

        function GetYearlyOverlap(year) {
            return $http({
                method: 'GET',
                url: 'api/overlap/videos/' + year
            });
        }
    }
})();