(function () {
    'use strict';

    angular
        .module('YTT')
        .directive('yearSelect', YearSelect);

    YearSelect.$inject = ['$parse', 'GeneralSvc'];

    function YearSelect($parse, GeneralSvc) {
        return {
            restrict : 'E',
            require  : '?ngModel',
            replace  : true,
            template : '<select ng-options="year as year for year in __Years"></select>',
            link     : Link
        };

        ///////////////////////////////////////////////////////////////////////
        function Link(scope, elem, attrs) {
            GeneralSvc.GetYears().then(
                function success(response) {
                    var modelGetter = $parse(attrs['ngModel']), modelSetter;

                    // sort the years in ascending order
                    scope.__Years = response.data.sort(function (a, b) {
                        if      (a < b) return -1;
                        else if (b < a) return  1;
                        else            return  0;
                    });


                    // default to the first year in the list if none are selected
                    if (modelGetter(scope) == null) {
                        modelSetter = modelGetter.assign;
                        modelSetter(scope, scope.__Years[0]);
                    }
                }
            );
        }
    }
})();