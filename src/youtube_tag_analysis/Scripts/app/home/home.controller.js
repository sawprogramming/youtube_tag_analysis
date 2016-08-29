(function () {
    'use strict';

    angular
        .module('YTT')
        .controller('HomeCtrl', HomeController);

    function HomeController() {
        var vm = this;

        vm.LookupTest = "Hello world!";
    }
})();