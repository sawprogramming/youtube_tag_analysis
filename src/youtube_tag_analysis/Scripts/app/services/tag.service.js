(function () {
    'use strict';

    angular
        .module('YTT')
        .factory('TagSvc', TagService);

    TagService.$inject = ['$http'];

    function TagService($http) {
        var service = {
            GetTagCounts   : GetTagCounts,
            GetMonthlyTop  : GetMonthlyTop,
            GetYearlyTop   : GetYearlyTop,
            GetMonthlyTags : GetMonthlyTags,
            GetYearlyTags  : GetYearlyTags
        };
        return service;

        ///////////////////////////////////////////////////////////////////////////
        function GetTagCounts() {
            return $http({
                method: 'GET',
                url: 'api/tags/counts'
            });
        }

        function GetMonthlyTop(year, month) {
            return $http({
                method: 'GET',
                url: 'api/tags/top/' + year + '/' + month 
            });
        }

        function GetYearlyTop(year) {
            return $http({
                method: 'GET',
                url: 'api/tags/top/' + year
            });
        }

        function GetMonthlyTags(year, month) {
            return $http({
                method: 'GET',
                url: 'api/tags/' + year + '/' + month
            });
        }

        function GetYearlyTags(year) {
            return $http({
                method: 'GET',
                url: 'api/tags/' + year
            });
        }
    }
})();