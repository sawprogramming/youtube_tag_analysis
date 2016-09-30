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

    }
})();