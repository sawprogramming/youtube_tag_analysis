(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('TagLengthCtrl', TagLengthController);

    TagLengthController.$inject = ['$scope', 'StatisticsSvc', 'TagSvc'];

    function TagLengthController($scope, StatisticsSvc, TagSvc) {
        var vm = this;
        var AreaChartData, MonthlyTagLengthHistogram, YearlyTagLengthHistogram;
        var HistogramOptions = {
            legend : {
                position: 'none'
            },
            theme  : 'maximized'
        };

        // model
        vm.MonthlyTagLength_Month = 12;

        initialize();

        ///////////////////////////////////////////////////////////////////////////
        function initialize() {
            FetchAreaChartData();
        }

        function FetchAreaChartData() {
            StatisticsSvc.GetTagLengthStats().then(
                function success(statistics) {
                    vm.TagLengthStats = statistics.data;

                    StatisticsSvc.GetTagLengthGraph().then(
                        function success(response) {
                            AreaChartData = new google.visualization.DataTable();
                            var chartData = new Array([]);

                            // create the chart data
                            AreaChartData.addColumn('number', 'Tag Length');
                            AreaChartData.addColumn('number', 'Frequency');
                            AreaChartData.addColumn({ type: 'string', role: 'annotation' });
                            for (var i = 0; i < response.data.length; ++i) {
                                chartData[i]    = new Array(3);
                                chartData[i][0] = i;
                                chartData[i][1] = response.data[i];
                            }
                            chartData[statistics.data.Average][2]      = "Average";
                            chartData[statistics.data.Median][2]       = "Median";
                            chartData[statistics.data.Quartiles[0]][2] = "Lower Quartile";
                            chartData[statistics.data.Quartiles[2]][2] = "Upper Quartile";
                            AreaChartData.addRows(chartData);

                            // draw the chart
                            DrawAreaChart();
                        }
                    );
                }
            );
        }

        function FetchYearlyHistogramData(year) {
            TagSvc.GetYearlyTags(year).then(
                function success(response) {
                    // setup the chart
                    YearlyTagLengthHistogram = new google.visualization.DataTable();
                    YearlyTagLengthHistogram.addColumn('string', 'Tag');
                    YearlyTagLengthHistogram.addColumn('number', 'Length');

                    // fill the chart with the data
                    angular.forEach(response.data, function (value, key) {
                        var rowData = new Array(2);
                        rowData[0]  = value;
                        rowData[1]  = value.length;
                        YearlyTagLengthHistogram.addRow(rowData);
                    });

                    // draw the chart
                    DrawYearlyHistogram();
                }
            );
        }

        function FetchMonthlyHistogramData(year, month) {
            TagSvc.GetMonthlyTags(year, month).then(
                function success(response) {
                    // setup the chart
                    MonthlyTagLengthHistogram = new google.visualization.DataTable();
                    MonthlyTagLengthHistogram.addColumn('string', 'Tag');
                    MonthlyTagLengthHistogram.addColumn('number', 'Length');

                    // fill the chart with the data
                    angular.forEach(response.data, function (value, key) {
                        var rowData = new Array(2);
                        rowData[0]  = value;
                        rowData[1]  = value.length;
                        MonthlyTagLengthHistogram.addRow(rowData);
                    });

                    // draw the chart
                    DrawMonthlyHistogram();
                }
            );
        }

        function DrawAreaChart() {
            // configure the chart
            var options = {
                theme  : 'maximized',
                legend : 'none',
                hAxis  : {
                    minorGridlines: {
                        count: 5
                    }
                }
            };

            // draw the chart
            var chart = new google.visualization.AreaChart(document.getElementById('tag_length_graph'));
            chart.draw(AreaChartData, options);
        }

        function DrawYearlyHistogram() {
            var chart = new google.visualization.Histogram(document.getElementById('yearly_tag_length_histogram'));
            chart.draw(YearlyTagLengthHistogram, HistogramOptions);
        }

        function DrawMonthlyHistogram() {
            var chart = new google.visualization.Histogram(document.getElementById('monthly_tag_length_histogram'));
            chart.draw(MonthlyTagLengthHistogram, HistogramOptions);
        }

        // ng-change isn't working so we're dealing with it this way
        $scope.$watch("vm.MonthlyTagLength_Month", function dosomething(current, previous) {
            if (current != previous) {
                FetchMonthlyHistogramData(vm.MonthlyTagLength_Year, current);
            }
        });
        $scope.$watch("vm.MonthlyTagLength_Year", function dosomething(current, previous) {
            if (current != previous) {
                FetchMonthlyHistogramData(current, vm.MonthlyTagLength_Month);
            }
        });
        $scope.$watch("vm.YearlyTagLength_Year", function dosomething(current, previous) {
            if (current != previous) {
                FetchYearlyHistogramData(current);
            }
        });
    }
})();