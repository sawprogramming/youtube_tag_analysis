(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('TagCtrl', TagController);

    TagController.$inject = ['TagSvc', '$scope'];

    function TagController(TagSvc, $scope) {
        var vm = this;

        vm.sortType    = 'Tag';
        vm.sortReverse = false;

        initialize();

        ///////////////////////////////////////////////////////////////////////////
        function initialize() {
            TagSvc.GetTags().then(
                function success(response) {
                    vm.Tags = response.data;
                }
            );
        }

        function FetchMonthlyTop10(year, month) {
            TagSvc.GetMonthlyTop10(year, month).then(
                function success(response) {
                    var tags = response.data;

                    // add the ranks to the tags
                    vm.MonthlyTop10 = [];
                    for(var i = 0; i < tags.length; ++i) {
                        vm.MonthlyTop10[i] = {
                            Rank      : i + 1,
                            Tag       : tags[i].Tag,
                            NumVideos : tags[i].NumVideos
                        };
                    }
                }
            );
        }

        function FetchYearlyTop10(year) {
            TagSvc.GetYearlyTop10(year).then(
                function success(response) {
                    var tags = response.data;

                    // add the ranks to the tags
                    vm.YearlyTop10 = [];
                    for(var i = 0; i < tags.length; ++i) {
                        vm.YearlyTop10[i] = {
                            Rank      : i + 1,
                            Tag       : tags[i].Tag,
                            NumVideos : tags[i].NumVideos
                        };
                    }
                }
            );
        }

        // ng-change isn't working so we're dealing with it this way
        $scope.$watch("vm.MonthlyTop10_Month", function dosomething(current, previous) {
            if (current != previous) {
                FetchMonthlyTop10(vm.MonthlyTop10_Year, current);
            }
        });
        $scope.$watch("vm.MonthlyTop10_Year", function dosomething(current, previous) {
            if (current != previous) {
                FetchMonthlyTop10(current, vm.MonthlyTop10_Month);
            }
        });
        $scope.$watch("vm.YearlyTop10_Year", function dosomething(current, previous) {
            if (current != previous) {
                FetchYearlyTop10(current);
            }
        });
    }
})();