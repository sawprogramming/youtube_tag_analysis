(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('TagCtrl', TagController);

    TagController.$inject = ['$scope', 'TagSvc'];

    function TagController($scope, TagSvc) {
        var vm = this;

        // model
        vm.sortType    = 'Tag';
        vm.sortReverse = false;

        initialize();

        ///////////////////////////////////////////////////////////////////////////
        function initialize() {
            TagSvc.GetTagCounts().then(
                function success(response) {
                    vm.Tags = response.data;
                }
            );
        }
    }
})();