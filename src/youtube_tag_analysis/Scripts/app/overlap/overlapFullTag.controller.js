(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('OverlapFullTagCtrl', OverlapFullTagController);

    OverlapFullTagController.$inject = ['$scope', 'OverlapSvc'];

    function OverlapFullTagController($scope, OverlapSvc) {
        var vm = this;
        var HistogramOptions = {
            legend : {
                position: 'none'
            },
            theme  : 'maximized'
        };

        // model
        vm.MonthlyTagTitle_Month      = 12;
        vm.MonthlyTagDescr_Month      = 12;
        vm.MonthlyTagTitleDescr_Month = 12;

        ///////////////////////////////////////////////////////////////////////////
         function DrawMonthlyHistogram(year, month, id, column) {
            OverlapSvc.GetMonthlyOverlap(year, month).then(
                function success(response) {
                    // setup the chart
                    var histogram = new google.visualization.DataTable();
                    histogram.addColumn('string', 'Video');
                    histogram.addColumn('number', 'Overlap Percentage');

                    // fill the chart with the data
                    angular.forEach(response.data, function (value, key) {
                        var rowData = new Array(2);
                        rowData[0]  = value.ID;
                        rowData[1]  = value[column];
                        histogram.addRow(rowData);
                    });

                    // draw the chart
                    var chart = new google.visualization.Histogram(document.getElementById(id));
                    chart.draw(histogram, HistogramOptions);
                }
            );
        }

        function DrawYearlyHistogram(year, id, column) {
            OverlapSvc.GetYearlyOverlap(year).then(
                function success(response) {
                    // setup the chart
                    var histogram = new google.visualization.DataTable();
                    histogram.addColumn('string', 'Video');
                    histogram.addColumn('number', 'Overlap Percentage');

                    // fill the chart with the data
                    angular.forEach(response.data, function (value, key) {
                        var rowData = new Array(2);
                        rowData[0]  = value.ID;
                        rowData[1]  = value[column];
                        histogram.addRow(rowData);
                    });

                    // draw the chart
                    var chart = new google.visualization.Histogram(document.getElementById(id));
                    chart.draw(histogram, HistogramOptions);
                }
            );
        }

        // ng-change isn't working so we're dealing with it this way
        $scope.$watch("vm.MonthlyTagTitle_Month", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(vm.MonthlyTagTitle_Year, current, 'monthly_tagtitle_histogram', 'TagTitle');
            }
        });
        $scope.$watch("vm.MonthlyTagTitle_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(current, vm.MonthlyTagTitle_Month, 'monthly_tagtitle_histogram', 'TagTitle');
            }
        });
        $scope.$watch("vm.MonthlyTagDescr_Month", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(vm.MonthlyTagDescr_Year, current, 'monthly_tagdescr_histogram', 'TagDescription');
            }
        });
        $scope.$watch("vm.MonthlyTagDescr_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(current, vm.MonthlyTagDescr_Month, 'monthly_tagdescr_histogram', 'TagDescription');
            }
        });
        $scope.$watch("vm.MonthlyTagTitleDescr_Month", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(vm.MonthlyTagTitleDescr_Year, current, 'monthly_tagtitledescr_histogram', 'TagTitleDescription');
            }
        });
        $scope.$watch("vm.MonthlyTagTitleDescr_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(current, vm.MonthlyTagTitleDescr_Month, 'monthly_tagtitledescr_histogram', 'TagTitleDescription');
            }
        });
        $scope.$watch("vm.YearlyTagTitle_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawYearlyHistogram(current, 'yearly_tagtitle_histogram', 'TagTitle');
            }
        });
        $scope.$watch("vm.YearlyTagDescr_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawYearlyHistogram(current, 'yearly_tagdescr_histogram', 'TagDescription');
            }
        });
        $scope.$watch("vm.YearlyTagTitleDescr_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawYearlyHistogram(current, 'yearly_tagtitledescr_histogram', 'TagTitleDescription');
            }
        });
    }
})();