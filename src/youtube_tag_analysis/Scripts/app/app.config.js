(function () {
    'use strict';

    angular
        .module('YTT')
        .config(configureDatepicker)
        .config(configureDatepickerPopup)
        .config(configureTimepicker);
 
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
})();