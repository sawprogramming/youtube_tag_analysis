(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('VideoModalCtrl', VideoModalController);

    VideoModalController.$inject = ['$uibModalInstance', 'VideoSvc', 'entity'];

    function VideoModalController($uibModalInstance, VideoSvc, entity) {
        var vm = this;

        // video model
        vm.ID = entity.ID;

        // controller functions/variables
        vm.cancel         = function () { $uibModalInstance.dismiss('cancel'); };

        initialize();

        ///////////////////////////////////////////////////////////////////////
        function initialize() {
            VideoSvc.GetVideoDetails(vm.ID).then(
                function success(response) {
                    var video = response.data;

                    vm.Title       = video.Title;
                    vm.Description = video.Description;
                    vm.Tags        = video.Tags;
                    vm.Transcript  = video.Transcript;
                }
            );
        }
    }
})();