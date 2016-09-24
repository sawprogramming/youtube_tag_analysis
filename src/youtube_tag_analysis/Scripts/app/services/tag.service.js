(function () {
    'use strict';

    angular
        .module('YTT')
        .factory('TagSvc', TagService);

    TagService.$inject = ['$http'];

    function TagService($http) {
        var service = {
            GetTags         : GetTags,
            GetMonthlyTop10 : GetMonthlyTop10,
            GetYearlyTop10  : GetYearlyTop10
        };
        return service;

        ///////////////////////////////////////////////////////////////////////////
        function GetTags() {
            return $http({
                method: 'GET',
                url: 'api/tags'
            });
        }

        function GetMonthlyTop10(year, month) {
            return $http({
                method: 'GET',
                url: 'api/tags/top10/' + year + '/' + month 
            });
        }

        function GetYearlyTop10(year) {
            return $http({
                method: 'GET',
                url: 'api/tags/top10/' + year
            });
        }
    }
})();