(function () {
    'use strict';

    var photosApp = angular.module('photosApp');
    photosApp.constant('dateFormat', 'MM/dd/yyyy');
    photosApp.config(['paginationTemplateProvider', function (paginationTemplateProvider) {
        paginationTemplateProvider.setPath('/App/views/pagination.html');
    }]);

    photosApp.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.debugInfoEnabled(true);
    }]);
})();