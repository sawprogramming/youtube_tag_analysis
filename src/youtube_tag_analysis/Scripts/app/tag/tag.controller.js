(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('TagCtrl', TagController);

    TagController.$inject = ['TagSvc', '$scope', 'StatisticsSvc'];

    function TagController(TagSvc, $scope, StatisticsSvc) {
        var vm = this;
        var AreaChartData, MonthlyTagLengthHistogram, YearlyTagLengthHistogram;

        // model
        vm.sortType         = 'Tag';
        vm.sortReverse      = false;
        vm.MonthlyTop_Month = null;
        vm.MonthlyTop_Year  = null;
        vm.YearlyTop_Year   = null;

        initialize();

        ///////////////////////////////////////////////////////////////////////////
        function initialize() {
            TagSvc.GetTagCounts().then(
                function success(response) {
                    vm.Tags = response.data;
                }
            );

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

        function DrawAreaChart() {
            // configure the chart
            var options = {
                theme: 'maximized',
                legend: 'none',
                hAxis: {
                    minorGridlines: {
                        count: 5
                    }
                }
            };
                    
            // draw the chart
            var chart = new google.visualization.AreaChart(document.getElementById('tag_length_graph'));
            chart.draw(AreaChartData, options);
        }

        function FetchMonthlyTop(year, month) {
            TagSvc.GetMonthlyTop(year, month).then(
                function success(response) {
                    var tags = response.data;

                    // add the ranks to the tags
                    vm.MonthlyTop = [];
                    for(var i = 0; i < tags.length; ++i) {
                        vm.MonthlyTop[i] = {
                            Rank      : i + 1,
                            Tag       : tags[i].Tag,
                            NumVideos : tags[i].NumVideos
                        };
                    }
                }
            );
        }

        function FetchYearlyTop(year) {
            TagSvc.GetYearlyTop(year).then(
                function success(response) {
                    var tags = response.data;

                    // add the ranks to the tags
                    vm.YearlyTop = [];
                    for(var i = 0; i < tags.length; ++i) {
                        vm.YearlyTop[i] = {
                            Rank      : i + 1,
                            Tag       : tags[i].Tag,
                            NumVideos : tags[i].NumVideos
                        };
                    }
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
                        rowData[0] = value;
                        rowData[1] = value.length;
                        YearlyTagLengthHistogram.addRow(rowData);
                    });

                    // draw the chart
                    DrawYearlyHistogram();
                }
            );
        }

        function DrawYearlyHistogram() {
            var options = {
                legend: {
                    position: 'none'
                },
                theme: 'maximized'
            };

            var chart = new google.visualization.Histogram(document.getElementById('yearly_tag_length_histogram'));
            chart.draw(YearlyTagLengthHistogram, options);
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
                        rowData[0] = value;
                        rowData[1] = value.length;
                        MonthlyTagLengthHistogram.addRow(rowData);
                    });

                    // draw the chart
                    DrawMonthlyHistogram();
                }
            );
        }

        function DrawMonthlyHistogram() {
            var options = {
                legend: {
                    position: 'none'
                },
                theme: 'maximized'
            };

            var chart = new google.visualization.Histogram(document.getElementById('monthly_tag_length_histogram'));
            chart.draw(MonthlyTagLengthHistogram, options);
        }

        // ng-change isn't working so we're dealing with it this way
        $scope.$watch("vm.MonthlyTop_Month", function dosomething(current, previous) {
            if (current != previous) {
                FetchMonthlyTop(vm.MonthlyTop_Year, current);
            }
        });
        $scope.$watch("vm.MonthlyTop_Year", function dosomething(current, previous) {
            if (current != previous) {
                FetchMonthlyTop(current, vm.MonthlyTop_Month);
            }
        });
        $scope.$watch("vm.YearlyTop_Year", function dosomething(current, previous) {
            if (current != previous) {
                FetchYearlyTop(current);
            }
        });
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