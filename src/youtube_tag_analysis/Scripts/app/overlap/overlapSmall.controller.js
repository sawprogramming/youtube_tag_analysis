(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('OverlapSmallCtrl', OverlapSmallController);

    OverlapSmallController.$inject = ['$scope', 'OverlapSvc']

    function OverlapSmallController($scope, OverlapSvc) {
        var vm = this;

        // model
        vm.VideoOverlap = [];

        initialize();

        ///////////////////////////////////////////////////////////////////////////
        function initialize() {

        }
    }
})();