(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('OverlapSmallTagCtrl', OverlapSmallTagController);

    OverlapSmallTagController.$inject = ['$scope', 'OverlapSvc'];

    function OverlapSmallTagController($scope, OverlapSvc) {
        var vm = this;
        var HistogramOptions = {
            legend : {
                position: 'none'
            },
            theme  : 'maximized'
        };

        // model
        vm.MonthlyTagTrans_Month           = 1;
        vm.MonthlyTagTrans_Year            = 2010;
        vm.MonthlyTagTitleDescrTrans_Month = 1;
        vm.MonthlyTagTitleDescrTrans_Year  = 2010;
        vm.YearlyTagTrans_Year             = 2010;
        vm.YearlyTagTitleDescrTrans_Year   = 2010;

        initialize();

        ///////////////////////////////////////////////////////////////////////////
        function initialize() {
            DrawMonthlyHistogram(vm.MonthlyTagTrans_Year,           vm.MonthlyTagTrans_Month,           'monthly_tagtrans_histogram',           'TagTranscript');
            DrawMonthlyHistogram(vm.MonthlyTagTitleDescrTrans_Year, vm.MonthlyTagTitleDescrTrans_Month, 'monthly_tagtitledescrtrans_histogram', 'TagTitleDescriptionTranscript');
            DrawYearlyHistogram(vm.YearlyTagTrans_Year,           'yearly_tagtrans_histogram',           'TagTranscript');
            DrawYearlyHistogram(vm.YearlyTagTitleDescrTrans_Year, 'yearly_tagtitledescrtrans_histogram', 'TagTitleDescriptionTranscript');
        }

        function DrawMonthlyHistogram(year, month, id, column) {
            OverlapSvc.GetSmallMonthlyOverlap(year, month).then(
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
            OverlapSvc.GetSmallYearlyOverlap(year).then(
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
        $scope.$watch("vm.MonthlyTagTrans_Month", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(vm.MonthlyTagTrans_Year, current, 'monthly_tagtrans_histogram', 'TagTranscript');
            }
        });
        $scope.$watch("vm.MonthlyTagTrans_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(current, vm.MonthlyTagTrans_Month, 'monthly_tagtrans_histogram', 'TagTranscript');
            }
        });
        $scope.$watch("vm.MonthlyTagTitleDescrTrans_Month", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(vm.MonthlyTagTitleDescrTrans_Year, current, 'monthly_tagtitledescrtrans_histogram', 'TagTitleDescriptionTranscript');
            }
        });
        $scope.$watch("vm.MonthlyTagTitleDescrTrans_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(current, vm.MonthlyTagTitleDescrTrans_Month, 'monthly_tagtitledescrtrans_histogram', 'TagTitleDescriptionTranscript');
            }
        });
        $scope.$watch("vm.YearlyTagTrans_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawYearlyHistogram(current, 'yearly_tagtrans_histogram', 'TagTranscript');
            }
        });
        $scope.$watch("vm.YearlyTagTitleDescrTrans_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawYearlyHistogram(current, 'yearly_tagtitledescrtrans_histogram', 'TagTitleDescriptionTranscript');
            }
        });
    }
})();