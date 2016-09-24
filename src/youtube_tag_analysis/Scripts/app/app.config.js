(function () {
    'use strict';

    angular
        .module('YTT')
        .config(configureDatepicker)
        .config(configureDatepickerPopup)
        .config(configureTimepicker)
        .config(configurePagination);
 
    ///////////////////////////////////////////////////////////////////////////
    function configureDatepicker(uibDatepickerConfig) {
        uibDatepickerConfig.showWeeks = false;
    }

    function configureDatepickerPopup(uibDatepickerPopupConfig) {
        uibDatepickerPopupConfig.datepickerPopup = 'MM/dd/yyyy';
    }

    function configureTimepicker(uibTimepickerConfig) {
        uibTimepickerConfig.showSpinners = false;
        uibTimepickerConfig.minuteStep = 15;
    }

    function configurePagination(paginationTemplateProvider) {
        paginationTemplateProvider.setPath('scripts/app/common/directives/dirPagination.tpl.html');
    }
})();