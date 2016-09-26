(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('OverlapCtrl', OverlapController);

    OverlapController.$inject = ['OverlapSvc', '$scope']

    function OverlapController(OverlapSvc, $scope) {
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