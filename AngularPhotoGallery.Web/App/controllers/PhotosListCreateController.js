(function () {
    'use strict';

    var photosApp = angular.module('photosApp');

    photosApp.controller('PhotosListCreateController', ['$scope', 'PhotosListService', '$location', function ($scope, PhotosListService, $location) {
        $scope.model = {};

        $scope.saveImage = function () {
            PhotosListService.postPhoto($scope.model).then(function (data) {
                alert('Your photo has been saved successfully.');
                $location.path('/list');
            }, function (error) {
                console.error(error.data);
            });
        };
    }]);
})();