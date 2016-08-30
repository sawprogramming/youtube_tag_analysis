(function () {
    'use strict';

    angular
        .module('YTT')
        .factory('StatisticsSvc', StatisticsService);

    StatisticsService.$inject = ['$http'];

    function StatisticsService($http) {
        var service = {
            GetTagsPerVideo         : GetTagsPerVideo,
            GetTagsPerVideoGraph    : GetTagsPerVideoGraph,
            GetYearlyTagsPerVideo   : GetYearlyTagsPerVideo,
            GetMonthlyTagsPerVideo  : GetMonthlyTagsPerVideo,
            GetMonthlyTaglessVideos : GetMonthlyTaglessVideos,
            GetYearlyTaglessVideos  : GetYearlyTaglessVideos
        };
        return service;

        ///////////////////////////////////////////////////////////////////////////
        function GetTagsPerVideo() {
            return $http({
                method : 'GET',
                url    : 'api/statistics/tags_per_video'
            });
        }

        function GetTagsPerVideoGraph() {
            return $http({
                method : 'GET',
                url    : 'api/statistics/graphs/tags_per_video'
            });
        }

        function GetYearlyTagsPerVideo(year) {
            return $http({
                method : 'GET',
                url    : 'api/statistics/histograms/tags_per_video/yearly/' + year
            });
        }

        function GetMonthlyTagsPerVideo(year, month) {
            return $http({
                method : 'GET',
                url    : 'api/statistics/histograms/tags_per_video/monthly/' + year + '/' + month
            });
        }

        function GetMonthlyTaglessVideos(year) {
            return $http({
                method : 'GET',
                url    : 'api/statistics/graphs/tagless/' + year
            });
        }

        function GetYearlyTaglessVideos() {
            return $http({
                method: 'GET',
                url: 'api/statistics/graphs/tagless'
            });
        }
    }
})();