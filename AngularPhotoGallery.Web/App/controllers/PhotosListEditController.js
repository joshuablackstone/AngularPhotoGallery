(function () {
    'use strict';

    var photosApp = angular.module('photosApp');

    photosApp.controller('PhotosListEditController', ['$scope', '$rootScope', '$uibModalInstance', 'model', function ($scope, $rootScope, $uibModalInstance, model) {
        $scope.model = model;

        $scope.saveImage = function (form) {
            if (!form.$valid) return false;

            $uibModalInstance.close($scope.model);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        /*
        Send data to other controller using $scope.$emit key value pair
        */
        $scope.testSendEmit = function () {
            $rootScope.$emit('joshListeningTest', new Date().toDateString());
        };
    }]);
})();