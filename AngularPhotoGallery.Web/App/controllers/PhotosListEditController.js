(function () {
    'use strict';

    var photosApp = angular.module('photosApp');

    photosApp.controller('PhotosListEditController', ['$scope', '$uibModalInstance', 'model', function ($scope, $uibModalInstance, model) {
        $scope.model = model;

        $scope.saveImage = function (form) {
            if (!form.$valid) return false;

            $uibModalInstance.close($scope.model);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);
})();