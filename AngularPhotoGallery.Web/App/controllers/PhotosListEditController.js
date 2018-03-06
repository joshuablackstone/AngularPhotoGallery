(function () {
    'use strict';

    var photosApp = angular.module('photosApp');

    photosApp.controller('PhotosListEditController', ['$scope', 'model', '$location', 'PhotosListService', function ($scope, model, $location, PhotosListService) {
        $scope.model = model;

        $scope.saveImage = function () {
            PhotosListService.editPhoto(model).then(function (data) {
                alert('Your photo has been saved successfully.');
                $location.path('/list');
            }, function (error) {
                console.error(error.data);
                alert('Error saving your photo :(.');
            });
        };
    }]);
})();