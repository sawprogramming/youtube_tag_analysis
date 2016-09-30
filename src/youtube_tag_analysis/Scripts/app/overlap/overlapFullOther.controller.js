(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('OverlapFullOtherCtrl', OverlapFullOtherController);

    OverlapFullOtherController.$inject = ['$scope', 'OverlapSvc'];

    function OverlapFullOtherController($scope, OverlapSvc) {
        var vm = this;
        var HistogramOptions = {
            legend : {
                position: 'none'
            },
            theme  : 'maximized'
        };

        // model
        vm.MonthlyTitleTag_Month      = 12;
        vm.MonthlyDescrTag_Month      = 12;
        vm.MonthlyTitleDescrTag_Month = 12;

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
        $scope.$watch("vm.MonthlyTitleTag_Month", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(vm.MonthlyTitleTag_Year, current, 'monthly_titletag_histogram', 'TitleTag');
            }
        });
        $scope.$watch("vm.MonthlyTitleTag_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(current, vm.MonthlyTitleTag_Month, 'monthly_titletag_histogram', 'TitleTag');
            }
        });
        $scope.$watch("vm.MonthlyDescrTag_Month", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(vm.MonthlyDescrTag_Year, current, 'monthly_descrtag_histogram', 'DescriptionTag');
            }
        });
        $scope.$watch("vm.MonthlyDescrTag_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(current, vm.MonthlyDescrTag_Month, 'monthly_descrtag_histogram', 'DescriptionTag');
            }
        });
        $scope.$watch("vm.MonthlyTitleDescrTag_Month", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(vm.MonthlyTitleDescrTag_Year, current, 'monthly_titledescrtag_histogram', 'TitleDescriptionTag');
            }
        });
        $scope.$watch("vm.MonthlyTitleDescrTag_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(current, vm.MonthlyTitleDescrTag_Month, 'monthly_titledescrtag_histogram', 'TitleDescriptionTag');
            }
        });
        $scope.$watch("vm.YearlyTitleTag_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawYearlyHistogram(current, 'yearly_titletag_histogram', 'TitleTag');
            }
        });
        $scope.$watch("vm.YearlyDescrTag_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawYearlyHistogram(current, 'yearly_descrtag_histogram', 'DescriptionTag');
            }
        });
        $scope.$watch("vm.YearlyTitleDescrTag_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawYearlyHistogram(current, 'yearly_titledescrtag_histogram', 'TitleDescriptionTag');
            }
        });
    }
})();