(function() {
    'use strict';

    angular
        .module('YTT')
        .controller('VideoQuartileCtrl', VideoQuartileController);

    VideoQuartileController.$inject = ['$scope', 'StatisticsSvc', 'VideoSvc'];

    function VideoQuartileController($scope, StatisticsSvc, VideoSvc) {
        var vm = this;
        var MonthlyQuartileChart, YearlyQuartileChart;
        var HistogramOptions = {
            legend: {
                position: 'none'
            },
            theme: 'maximized'
        };
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        initialize();

        ///////////////////////////////////////////////////////////////////////////
        function initialize() {
            FetchYearlyQuartileData();
        }

        function FetchMonthlyQuartileData(year) {
            StatisticsSvc.GetMonthlyQuartilePercentages(year).then(
                function success(response) {
                    // setup the chart
                    MonthlyQuartileChart = new google.visualization.DataTable();
                    MonthlyQuartileChart.addColumn('string', 'Month');
                    MonthlyQuartileChart.addColumn('number', 'Percentage of Videos below First Quartile');

                    // fill the chart with data
                    angular.forEach(response.data, function (value, key) {
                        var rowData = new Array(2);
                        rowData[0] = months[value.Key - 1];
                        rowData[1] = value.Value;
                        MonthlyQuartileChart.addRow(rowData);
                    });

                    // draw the chart
                    DrawMonthlyQuartileChart();
                }
            );
        }

        function FetchYearlyQuartileData() {
            StatisticsSvc.GetYearlyQuartilePercentages().then(
                function success(response) {
                    // setup the chart
                    YearlyQuartileChart = new google.visualization.DataTable();
                    YearlyQuartileChart.addColumn('string', 'Year');
                    YearlyQuartileChart.addColumn('number', 'Percentage of Videos below First Quartile');

                    // fill the chart with data
                    angular.forEach(response.data, function (value, key) {
                        var rowData = new Array(2);
                        rowData[0] = value.Key.toString();
                        rowData[1] = value.Value;
                        YearlyQuartileChart.addRow(rowData);
                    });

                    // draw the chart
                    DrawYearlyQuartileChart();
                }
            );
        }

        function DrawMonthlyQuartileChart() {
            var chart = new google.visualization.ColumnChart(document.getElementById('monthly_quartile_chart'));
            chart.draw(MonthlyQuartileChart, HistogramOptions);
        }

        function DrawYearlyQuartileChart() {
            var chart = new google.visualization.ColumnChart(document.getElementById('yearly_quartile_chart'));
            chart.draw(YearlyQuartileChart, HistogramOptions);
        }

        // ng-change isn't working so we're dealing with it this way
        $scope.$watch("vm.MonthlyQuartile_Year", function dosomething(current, previous) {
            if (current != previous) {
                FetchMonthlyQuartileData(current);
            }
        });
    }
})();