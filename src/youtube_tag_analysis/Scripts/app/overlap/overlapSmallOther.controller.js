(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('OverlapSmallOtherCtrl', OverlapSmallOtherController);

    OverlapSmallOtherController.$inject = ['$scope', 'OverlapSvc'];

    function OverlapSmallOtherController($scope, OverlapSvc) {
        var vm = this;
        var HistogramOptions = {
            legend : {
                position: 'none'
            },
            theme  : 'maximized'
        };

        // model
        vm.MonthlyTransTag_Month           = 1;
        vm.MonthlyTransTag_Year            = 2010;
        vm.MonthlyTitleDescrTransTag_Month = 1;
        vm.MonthlyTitleDescrTransTag_Year  = 2010;
        vm.YearlyTransTag_Year             = 2010;
        vm.YearlyTitleDescrTransTag_Year   = 2010;

        initialize();

        ///////////////////////////////////////////////////////////////////////////
        function initialize() {
            DrawMonthlyHistogram(vm.MonthlyTransTag_Year,           vm.MonthlyTransTag_Month,           'monthly_transtag_histogram',           'TranscriptTag');
            DrawMonthlyHistogram(vm.MonthlyTitleDescrTransTag_Year, vm.MonthlyTitleDescrTransTag_Month, 'monthly_titledescrtranstag_histogram', 'TitleDescriptionTranscriptTag');
            DrawYearlyHistogram(vm.YearlyTransTag_Year,           'yearly_transtag_histogram',           'TranscriptTag');
            DrawYearlyHistogram(vm.YearlyTitleDescrTransTag_Year, 'yearly_titledescrtranstag_histogram', 'TitleDescriptionTranscriptTag');
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
        $scope.$watch("vm.MonthlyTransTag_Month", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(vm.MonthlyTransTag_Year, current, 'monthly_transtag_histogram', 'TranscriptTag');
            }
        });
        $scope.$watch("vm.MonthlyTransTag_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(current, vm.MonthlyTransTag_Month, 'monthly_transtag_histogram', 'TranscriptTag');
            }
        });
        $scope.$watch("vm.MonthlyTitleDescrTransTag_Month", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(vm.MonthlyTitleDescrTransTag_Year, current, 'monthly_titledescrtranstag_histogram', 'TitleDescriptionTranscriptTag');
            }
        });
        $scope.$watch("vm.MonthlyTitleDescrTransTag_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawMonthlyHistogram(current, vm.MonthlyTitleDescrTransTag_Month, 'monthly_titledescrtranstag_histogram', 'TitleDescriptionTranscriptTag');
            }
        });
        $scope.$watch("vm.YearlyTransTag_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawYearlyHistogram(current, 'yearly_transtag_histogram', 'TranscriptTag');
            }
        });
        $scope.$watch("vm.YearlyTitleDescrTransTag_Year", function dosomething(current, previous) {
            if (current != previous) {
                DrawYearlyHistogram(current, 'yearly_titledescrtranstag_histogram', 'TitleDescriptionTranscriptTag');
            }
        });
    }
})();