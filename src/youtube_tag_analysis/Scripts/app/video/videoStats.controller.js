﻿(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('VideoStatsCtrl', VideoStatsController);

    VideoStatsController.$inject = ['$scope', 'StatisticsSvc', 'VideoSvc'];

    function VideoStatsController($scope, StatisticsSvc, VideoSvc) {
        var vm = this;
        var AreaChartData, YearlyTagsPerVideoHistogram, MonthlyTagsPerVideoHistogram;
        var HistogramOptions = {
            legend: {
                position: 'none'
            },
            theme: 'maximized'
        };

        // model
        vm.MonthlyTagsPerVideo_Month = 12;

        initialize();

        ///////////////////////////////////////////////////////////////////////////
        function initialize() {
            FetchAreaChartData();
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
            VideoSvc.GetYearlyTagsPerVideo(year).then(
                function success(response) {
                    // setup the chart
                    YearlyTagsPerVideoHistogram = new google.visualization.DataTable();
                    YearlyTagsPerVideoHistogram.addColumn('string', 'Video ID');
                    YearlyTagsPerVideoHistogram.addColumn('number', 'Number of Tags');

                    // fill the chart with the data
                    angular.forEach(response.data, function(value, key) {
                            var rowData = new Array(2);
                            rowData[0]  = value.ID;
                            rowData[1]  = value.NumTags;
                            YearlyTagsPerVideoHistogram.addRow(rowData);
                    });

                    // draw the chart
                    DrawYearlyHistogram();
                }
            );
        }

        function FetchMonthlyHistogramData(year, month) {
            VideoSvc.GetMonthlyTagsPerVideo(year, month).then(
                function success(response) {
                    // setup the chart
                    MonthlyTagsPerVideoHistogram = new google.visualization.DataTable();
                    MonthlyTagsPerVideoHistogram.addColumn('string', 'Video ID');
                    MonthlyTagsPerVideoHistogram.addColumn('number', 'Number of Tags');

                    // fill the chart with the data
                    angular.forEach(response.data, function (value, key) {
                        var rowData = new Array(2);
                        rowData[0]  = value.ID;
                        rowData[1]  = value.NumTags;
                        MonthlyTagsPerVideoHistogram.addRow(rowData);
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
            var chart = new google.visualization.AreaChart(document.getElementById('tags_per_video_graph'));
            chart.draw(AreaChartData, options);
        }

        function DrawYearlyHistogram() {
            var chart = new google.visualization.Histogram(document.getElementById('yearly_tags_per_video_histogram'));
            chart.draw(YearlyTagsPerVideoHistogram, HistogramOptions);
        }

        function DrawMonthlyHistogram() {
            var chart = new google.visualization.Histogram(document.getElementById('monthly_tags_per_video_histogram'));
            chart.draw(MonthlyTagsPerVideoHistogram, HistogramOptions);
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
    }
})();