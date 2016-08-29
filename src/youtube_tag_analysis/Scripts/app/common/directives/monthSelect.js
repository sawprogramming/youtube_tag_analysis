(function () {
    'use strict';

    angular
        .module('YTT')
        .directive('monthSelect', MonthSelect);

    MonthSelect.$inject = ['$parse'];

    function MonthSelect($parse) {
        return {
            restrict : 'E',
            require  : '?ngModel',
            replace  : true,
            template : '<select ng-options="month.ID as month.Name for month in __Months"></select>',
            link     : Link
        };

        ///////////////////////////////////////////////////////////////////////
        function Link(scope, elem, attrs) {
            var modelGetter = $parse(attrs['ngModel']), modelSetter;

            // setup the months
            scope.__Months = [
                { ID:  1, Name: 'January'   },
                { ID:  2, Name: 'February'  },
                { ID:  3, Name: 'March'     },
                { ID:  4, Name: 'April'     },
                { ID:  5, Name: 'May'       },
                { ID:  6, Name: 'June'      },
                { ID:  7, Name: 'July'      },
                { ID:  8, Name: 'August'    },
                { ID:  9, Name: 'September' },
                { ID: 10, Name: 'October'   },
                { ID: 11, Name: 'November'  },
                { ID: 12, Name: 'December'  }
            ];


            // default to the first month in the list if none are selected
            if (modelGetter(scope) == null) {
                modelSetter = modelGetter.assign;
                modelSetter(scope, scope.__Months[0].ID);
            }
        }
    }
})();