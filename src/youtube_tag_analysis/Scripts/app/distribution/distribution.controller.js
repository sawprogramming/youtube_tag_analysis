(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('DistributionCtrl', DistributionController);

    DistributionController.$inject = ['$scope', 'StatisticsSvc'];

    function DistributionController($scope, StatisticsSvc) {
        var vm = this;
        var AreaChartData, YearlyTagsPerVideoHistogram, MonthlyTagsPerVideoHistogram, MonthlyTaglessVideosChart, YearlyTaglessVideosChart;
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        // model
        vm.MonthlyTagsPerVideo_Month = null;
        vm.MonthlyTagsPerVideoo_Year = null;
        vm.YearlyTagsPerVideo_Year   = null;
        vm.MonthlyTaglessVideos_Year = null;
        vm.TaglessVideoPercentage    = null;

        initialize();

        ///////////////////////////////////////////////////////////////////////////
        function initialize() {
            FetchAreaChartData();
            FetchYearlyTaglessVideoData();
            FetchTaglessVideoPercentage();
        }

        function FetchAreaChartData() {
            StatisticsSvc.GetTagsPerVideo().then(
                function success(statistics) {
                    vm.TagsPerVideoStats = statistics.data;

                    StatisticsSvc.GetTagsPerVideoGraph().then(
                        function success(response) {
                            AreaChartData = new google.visualization.DataTable();
                            var chartData = new Array([]);

                            // create the chart data
                            AreaChartData.addColumn('number', 'Number of Tags');
                            AreaChartData.addColumn('number', 'Frequency');
                            AreaChartData.addColumn({ type: 'string', role: 'annotation' });
                            for (var i = 0; i < response.data.length; ++i) {
                                chartData[i] = new Array(3);
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
            var chart = new google.visualization.AreaChart(document.getElementById('tags_per_video_graph'));
            chart.draw(AreaChartData, options);
        }

        function FetchYearlyHistogramData(year) {
            StatisticsSvc.GetYearlyTagsPerVideo(year).then(
                function success(response) {
                    // setup the chart
                    YearlyTagsPerVideoHistogram = new google.visualization.DataTable();
                    YearlyTagsPerVideoHistogram.addColumn('string', 'Video ID');
                    YearlyTagsPerVideoHistogram.addColumn('number', 'Number of Tags');

                    // fill the chart with the data
                    angular.forEach(response.data, function(value, key) {
                            var rowData = new Array(2);
                            rowData[0] = value.ID;
                            rowData[1] = value.NumTags;
                            YearlyTagsPerVideoHistogram.addRow(rowData);
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

            var chart = new google.visualization.Histogram(document.getElementById('yearly_tags_per_video_histogram'));
            chart.draw(YearlyTagsPerVideoHistogram, options);
        }

        function FetchMonthlyHistogramData(year, month) {
            StatisticsSvc.GetMonthlyTagsPerVideo(year, month).then(
                function success(response) {
                    // setup the chart
                    MonthlyTagsPerVideoHistogram = new google.visualization.DataTable();
                    MonthlyTagsPerVideoHistogram.addColumn('string', 'Video ID');
                    MonthlyTagsPerVideoHistogram.addColumn('number', 'Number of Tags');

                    // fill the chart with the data
                    angular.forEach(response.data, function (value, key) {
                        var rowData = new Array(2);
                        rowData[0] = value.ID;
                        rowData[1] = value.NumTags;
                        MonthlyTagsPerVideoHistogram.addRow(rowData);
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

            var chart = new google.visualization.Histogram(document.getElementById('monthly_tags_per_video_histogram'));
            chart.draw(MonthlyTagsPerVideoHistogram, options);
        }

        function FetchMonthlyTaglessVideoData(year) {
            StatisticsSvc.GetMonthlyTaglessVideos(year).then(
                function success(response) {
                    // setup the chart
                    MonthlyTaglessVideosChart = new google.visualization.DataTable();
                    MonthlyTaglessVideosChart.addColumn('string', 'Month');
                    MonthlyTaglessVideosChart.addColumn('number', 'Percentage of Tagless Videos');

                    // fill the chart with data
                    angular.forEach(response.data, function (value, key) {
                        var rowData = new Array(2);
                        rowData[0] = months[value.Key - 1];
                        rowData[1] = value.Value;
                        MonthlyTaglessVideosChart.addRow(rowData);
                    });

                    // draw the chart
                    DrawMonthlyTaglessChart();
                }
            );
        }

        function DrawMonthlyTaglessChart() {
            var options = {
                legend: {
                    position: 'none'
                },
                theme: 'maximized'
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('monthly_tagless_videos_chart'));
            chart.draw(MonthlyTaglessVideosChart, options);
        }

        function FetchYearlyTaglessVideoData() {
            StatisticsSvc.GetYearlyTaglessVideos().then(
                function success(response) {
                    // setup the chart
                    YearlyTaglessVideosChart = new google.visualization.DataTable();
                    YearlyTaglessVideosChart.addColumn('string', 'Year');
                    YearlyTaglessVideosChart.addColumn('number', 'Percentage of Tagless Videos');

                    // fill the chart with data
                    angular.forEach(response.data, function (value, key) {
                        var rowData = new Array(2);
                        rowData[0] = value.Key.toString();
                        rowData[1] = value.Value;
                        YearlyTaglessVideosChart.addRow(rowData);
                    });

                    // draw the chart
                    DrawYearlyTaglessChart();
                }
            );
        }

        function DrawYearlyTaglessChart() {
            var options = {
                legend: {
                    position: 'none'
                },
                theme: 'maximized'
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('yearly_tagless_videos_chart'));
            chart.draw(YearlyTaglessVideosChart, options);
        }

        function FetchTaglessVideoPercentage() {
            StatisticsSvc.GetTaglessVideoPercentage().then(
                function success(response) {
                    vm.TaglessVideoPercentage = response.data;
                }
            );
        }


        // ng-change isn't working so we're dealing with it this way
        $scope.$watch("vm.YearlyTagsPerVideo_Year", function dosomething(current, previous) {
            if (current != previous) {
                FetchYearlyHistogramData(current);
            }
        });
        $scope.$watch("vm.MonthlyTagsPerVideo_Month", function dosomething(current, previous) {
            if (current != previous) {
                FetchMonthlyHistogramData(vm.MonthlyTagsPerVideo_Year, current);
            }
        });
        $scope.$watch("vm.MonthlyTagsPerVideo_Year", function dosomething(current, previous) {
            if (current != previous) {
                FetchMonthlyHistogramData(current, vm.MonthlyTagsPerVideo_Month);
            }
        });
        $scope.$watch("vm.MonthlyTaglessVideos_Year", function dosomething(current, previous) {
            if (current != previous) {
                FetchMonthlyTaglessVideoData(current);
            }
        });
    }
})();