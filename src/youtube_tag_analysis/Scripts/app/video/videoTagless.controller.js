(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('VideoTaglessCtrl', VideoTaglessController);

    VideoTaglessController.$inject = ['$scope', 'VideoSvc'];

    function VideoTaglessController($scope, VideoSvc) {
        var vm = this;
        var MonthlyTaglessVideosChart, YearlyTaglessVideosChart;
        var HistogramOptions = {
            legend : {
                position: 'none'
            },
            theme  : 'maximized'
        };
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        initialize();

        ///////////////////////////////////////////////////////////////////////////
        function initialize() {
            FetchYearlyTaglessVideoData();
            FetchTaglessVideoPercentage();
        }

        function FetchMonthlyTaglessVideoData(year) {
            VideoSvc.GetMonthlyTaglessVideos(year).then(
                function success(response) {
                    // setup the chart
                    MonthlyTaglessVideosChart = new google.visualization.DataTable();
                    MonthlyTaglessVideosChart.addColumn('string', 'Month');
                    MonthlyTaglessVideosChart.addColumn('number', 'Percentage of Tagless Videos');

                    // fill the chart with data
                    angular.forEach(response.data, function (value, key) {
                        var rowData = new Array(2);
                        rowData[0]  = months[value.Key - 1];
                        rowData[1]  = value.Value;
                        MonthlyTaglessVideosChart.addRow(rowData);
                    });

                    // draw the chart
                    DrawMonthlyTaglessChart();
                }
            );
        }

        function FetchYearlyTaglessVideoData() {
            VideoSvc.GetYearlyTaglessVideos().then(
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

        function FetchTaglessVideoPercentage() {
            VideoSvc.GetTaglessVideoPercentage().then(
                function success(response) {
                    vm.TaglessVideoPercentage = response.data;
                }
            );
        }

        function DrawMonthlyTaglessChart() {
            var chart = new google.visualization.ColumnChart(document.getElementById('monthly_tagless_videos_chart'));
            chart.draw(MonthlyTaglessVideosChart, HistogramOptions);
        }

        function DrawYearlyTaglessChart() {
            var chart = new google.visualization.ColumnChart(document.getElementById('yearly_tagless_videos_chart'));
            chart.draw(YearlyTaglessVideosChart, HistogramOptions);
        }

        // ng-change isn't working so we're dealing with it this way
        $scope.$watch("vm.MonthlyTaglessVideos_Year", function dosomething(current, previous) {
            if (current != previous) {
                FetchMonthlyTaglessVideoData(current);
            }
        });
    }
})();