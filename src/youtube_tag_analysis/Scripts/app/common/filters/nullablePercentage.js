(function () {
    'use strict';

    angular
        .module('YTT')
        .filter('nullablePercentage', NullablePercentage);

    NullablePercentage.$inject = ['$filter'];

    function NullablePercentage($filter) {
        return function(input) {
            if   (input == null) return '-';
            else                 return $filter('number')(input, 0) + '%';
        };
    }
})();