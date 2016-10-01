(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('OverlapSmallCtrl', OverlapSmallController);

    OverlapSmallController.$inject = ['$scope', '$uibModal', 'OverlapSvc']

    function OverlapSmallController($scope, $uibModal, OverlapSvc) {
        var vm = this;

        // model
        vm.VideoOverlap = [];
        vm.ViewDetails  = ViewDetails;

        initialize();

        ///////////////////////////////////////////////////////////////////////////
        function initialize() {
            OverlapSvc.GetSmallOverlap().then(
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
                    entity: function () { return entity; }
                }
            });
        }
    }
})();