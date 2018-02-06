(function () {
    'use strict';

    var photosApp = angular.module('photosApp');

    // My bad... :).  Used config instead of constant!
    photosApp.constant('dateFormat', 'MM/dd/yyyy');
    photosApp.config(['paginationTemplateProvider', function (paginationTemplateProvider) {
        paginationTemplateProvider.setPath('/App/views/pagination.html');
    }]);

    photosApp.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.debugInfoEnabled(true);
    }]);
})();