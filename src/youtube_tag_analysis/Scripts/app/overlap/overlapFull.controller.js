(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('OverlapFullCtrl', OverlapFullController);

    OverlapFullController.$inject = ['$scope', 'OverlapSvc']

    function OverlapFullController($scope, OverlapSvc) {
        var vm = this;

        // model
        vm.VideoOverlap = [];

        initialize();

        ///////////////////////////////////////////////////////////////////////////
        function initialize() {
            OverlapSvc.GetVideoOverlap().then(
                function success(response) {
                    vm.VideoOverlap = response.data;
                }
            );
        }
    }
})();