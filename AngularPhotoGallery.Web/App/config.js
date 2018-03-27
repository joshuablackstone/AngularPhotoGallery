(function () {
    'use strict';

    var photosApp = angular.module('photosApp');
    photosApp.constant('dateFormat', 'MM/dd/yyyy');

    photosApp.config(['paginationTemplateProvider', function (paginationTemplateProvider) {
        paginationTemplateProvider.setPath('/App/views/pagination.html');
    }]);

    photosApp.config(['photoPanelTemplateProvider', function (photoPanelTemplateProvider) {
        photoPanelTemplateProvider.setPath('/App/views/photoPanel.html');
    }]);

    photosApp.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.debugInfoEnabled(true);
    }]);

    photosApp.config(['$httpProvider', function ($httpProvider) {
        var sampleToken = Math.random();
        $httpProvider.defaults.headers.common.token = sampleToken;

        $httpProvider.interceptors.push(['$q', '$window',
            function ($q, $window) {
                return {
                    request: function (config) {
                        console.log(config);
                        return config;
                    },
                    requestError: function (rejection) {
                        console.error('This is the REQUEST error from the config file: ' + angular.toJson(rejection));
                        return $q.reject(rejection);
                    },
                    responseError: function (rejection) {
                        console.error('This is the RESPONSE error from the config file: ' + angular.toJson(rejection));
                        return $q.reject(rejection);
                    }
                };
            }]);
    }]);


})();