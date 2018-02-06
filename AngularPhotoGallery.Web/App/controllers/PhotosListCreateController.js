(function () {
    'use strict';

    var photosApp = angular.module('photosApp');

    photosApp.controller('PhotosListCreateController', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
        $scope.model = {};

        $scope.saveImage = function (form) {
            if (!form.$valid) return false;

            $uibModalInstance.close($scope.model);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);
})();