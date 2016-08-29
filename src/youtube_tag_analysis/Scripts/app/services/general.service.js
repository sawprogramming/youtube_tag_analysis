(function () {
    'use strict';

    angular
        .module('YTT')
        .factory('GeneralSvc', GeneralService);

    GeneralService.$inject = ['$http'];

    function GeneralService($http) {
        var service = {
            GetYears : GetYears
        };
        return service;

        ///////////////////////////////////////////////////////////////////////////
        function GetYears() {
            return $http({
                method : 'GET',
                url    : 'api/general/years'
            })
        }
    }
})();