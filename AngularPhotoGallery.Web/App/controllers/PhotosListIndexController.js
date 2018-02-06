(function () {
    'use strict';

    var photosApp = angular.module('photosApp');

    photosApp.controller('PhotosListController', ['$scope', 'PhotosListService', '$uibModal', 'dateFormat',
        function ($scope, PhotosListService, $uibModal, dateFormat) {
            $scope.title = 'Hello World';
            $scope.photos = [];
            $scope.dateFormat = dateFormat;

            PhotosListService.getPhotos().then(function (response) {
                $scope.photos = response.data;
            }, function (error) {
                console.error(error.data);
            });

            $scope.addImage = function () {
                var modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: '/App/views/PhotosList.Create.html',
                    controller: 'PhotosListCreateController',
                    size: 'lg'
                });

                modalInstance.result.then(function (model) {
                    if (model) {
                        PhotosListService.postPhoto(model.File).then(function (data) {
                            $scope.photos.push(data.data);
                            alert('Your photo has been saved successfully.');
                        }, function (error) {
                            console.error(error.data);
                        });
                    }
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
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