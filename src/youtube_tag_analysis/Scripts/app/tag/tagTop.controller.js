(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('TagTopCtrl', TagTopController);

    TagTopController.$inject = ['$scope', 'TagSvc'];

    function TagTopController($scope, TagSvc) {
        var vm = this;

        // model
        vm.MonthlyTop_Month = 12;

        ///////////////////////////////////////////////////////////////////////////
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
    }
})();