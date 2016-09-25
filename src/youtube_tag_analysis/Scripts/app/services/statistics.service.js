(function () {
    'use strict';

    angular
        .module('YTT')
        .factory('StatisticsSvc', StatisticsService);

    StatisticsService.$inject = ['$http'];

    function StatisticsService($http) {
        var service = {
            GetTagsPerVideo               : GetTagsPerVideo,
            GetTagsPerVideoGraph          : GetTagsPerVideoGraph,
            GetMonthlyQuartilePercentages : GetMonthlyQuartilePercentages,
            GetYearlyQuartilePercentages  : GetYearlyQuartilePercentages,
            GetTagLengthStats             : GetTagLengthStats,
            GetTagLengthGraph             : GetTagLengthGraph
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

        function GetMonthlyQuartilePercentages(year) {
            return $http({
                method : 'GET',
                url    : 'api/statistics/graphs/vids_below_first_quartile/' + year
            });
        }

        function GetYearlyQuartilePercentages() {
            return $http({
                method : 'GET',
                url    : 'api/statistics/graphs/vids_below_first_quartile'
            });
        }

        function GetTagLengthStats() {
            return $http({
                method : 'GET',
                url    : 'api/statistics/tag_length'
            });
        }

        function GetTagLengthGraph() {
            return $http({
                method : 'GET',
                url    : 'api/statistics/graphs/tag_length'
            });
        }
    }
})();