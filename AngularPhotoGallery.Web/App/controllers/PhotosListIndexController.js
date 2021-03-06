﻿(function () {
    'use strict';

    var photosApp = angular.module('photosApp');

    photosApp.controller('PhotosListController', ['$scope', 'PhotosListService', 'dateFormat',
        function ($scope, PhotosListService, dateFormat) {
            $scope.title = 'Hello World';

            $scope.photos = [];
            $scope.filters = {};
            $scope.dateFormat = dateFormat,
                $scope.sortOrder = 'DateModified',
                $scope.sortAscending = false;

            PhotosListService.getPhotos().then(function (response) {
                $scope.photos = response.data;
            }, function (error) {
                console.error(error.data);
            });

            $scope.sortByTitle = function (property) {
                $scope.sortOrder = property;
                $scope.sortAscending = !$scope.sortAscending;
            };

            $scope.deleteImage = function (image) {
                PhotosListService.deletePhoto(image.Id).then(function () {
                    $scope.photos.splice($scope.photos.indexOf(image), 1);
                }, function (error) {
                    console.error(error.data);
                });
            };
        }]);
})();