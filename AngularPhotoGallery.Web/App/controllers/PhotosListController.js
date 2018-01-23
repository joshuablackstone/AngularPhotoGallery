(function () {
    'use strict';

    var photosApp = angular.module('photosApp');

    photosApp.controller('PhotosListController', ['$scope', 'PhotosListService', function ($scope, PhotosListService) {
        $scope.title = 'Hello World';
        $scope.photos = [];

        PhotosListService.getPhotos().then(function (response) {
            $scope.photos = response.data;
        }, function (error) {
            console.error(error.data);
        });
    }]);
})();