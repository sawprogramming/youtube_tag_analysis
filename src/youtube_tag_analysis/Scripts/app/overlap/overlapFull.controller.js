(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('OverlapFullCtrl', OverlapFullController);

    OverlapFullController.$inject = ['$scope', '$uibModal', 'OverlapSvc']

    function OverlapFullController($scope, $uibModal, OverlapSvc) {
        var vm = this;

        // model
        vm.VideoOverlap = [];
        vm.ViewDetails  = ViewDetails;

        initialize();

        ///////////////////////////////////////////////////////////////////////////
        function initialize() {
            OverlapSvc.GetVideoOverlap().then(
                function success(response) {
                    vm.VideoOverlap = response.data;
                }
            );
        }

        function ViewDetails(entity) {
            $uibModal.open({
                templateUrl  : 'scripts/app/video/video-modal.html',
                controller   : 'VideoModalCtrl',
                controllerAs : 'vm',
                resolve      : {
                    entity: function() { return entity; }
                }
            });
        }
    }
})();