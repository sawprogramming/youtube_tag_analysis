(function () {
    'use strict';

    angular
        .module('YTT')
        .factory('VideoSvc', VideoService);

    VideoService.$inject = ['$http'];

    function VideoService($http) {
        var service = {
            GetYearlyTagsPerVideo         : GetYearlyTagsPerVideo,
            GetMonthlyTagsPerVideo        : GetMonthlyTagsPerVideo,
            GetMonthlyTaglessVideos       : GetMonthlyTaglessVideos,
            GetYearlyTaglessVideos        : GetYearlyTaglessVideos,
            GetTaglessVideoPercentage     : GetTaglessVideoPercentage
        };
        return service;

        ///////////////////////////////////////////////////////////////////////////
        function GetYearlyTagsPerVideo(year) {
            return $http({
                method : 'GET',
                url    : 'api/videos/tags_per_video/' + year
            });
        }

        function GetMonthlyTagsPerVideo(year, month) {
            return $http({
                method : 'GET',
                url    : 'api/videos/tags_per_video/' + year + '/' + month
            });
        }

        function GetMonthlyTaglessVideos(year) {
            return $http({
                method : 'GET',
                url    : 'api/videos/tagless/' + year
            });
        }

        function GetYearlyTaglessVideos() {
            return $http({
                method : 'GET',
                url    : 'api/videos/tagless/year'
            });
        }

        function GetTaglessVideoPercentage() {
            return $http({
                method : 'GET',
                url    : 'api/videos/tagless'
            });
        }
    }
})();