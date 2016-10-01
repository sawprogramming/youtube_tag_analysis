(function () {
    'use strict';

    angular
        .module('YTT')
        .filter('trustAsResourceUrl', TrustAsResourceURL);

    TrustAsResourceURL.$inject = ['$filter', '$sce'];

    function TrustAsResourceURL($filter, $sce) {
        return function(input) {
            return $sce.trustAsResourceUrl(input);
        };
    }
})();