(function () {
    'use strict';

    var photosApp = angular.module('photosApp');

    photosApp.controller('PhotosListController', ['$scope', 'PhotosListService', '$rootScope', '$uibModal', 'dateFormat',
        function ($scope, PhotosListService, $rootScope, $uibModal, dateFormat) {
            $scope.title = 'Hello World';
            $scope.photos = [];
            $scope.dateFormat = dateFormat;

            PhotosListService.getPhotos().then(function (response) {
                $scope.photos = response.data;
            }, function (error) {
                console.error(error.data);
            });

            /*
                Listen to other controller using $scope.$on key value pair to return function of data passed into parameter
            */
            $rootScope.$on('joshListeningTest', function (e, dt) {
                alert('Data sent by $emit to Index Controller: ' + dt);
            });

            $scope.deleteImage = function (image) {
                PhotosListService.deletePhoto(image.Id).then(function () {
                    $scope.photos.splice($scope.photos.indexOf(image), 1);
                }, function (error) {
                    console.error(error.data);
                });
            };

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

            $scope.editImage = function (e) {
                var originalPhoto = angular.copy(e);

                var modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: '/App/views/PhotosList.Edit.html',
                    controller: 'PhotosListEditController',
                    size: 'lg',
                    resolve: {
                        model: function () {
                          // return e;
                           return originalPhoto;
                        }
                    }
                });

                modalInstance.result.then(function (model) {
                    if (model) {
                        PhotosListService.editPhoto(model).then(function (data) {
                            var _photo = data.data;
                            e.Title = _photo.Title;
                            e.Description = _photo.Description;
                            e.DateModified = _photo.DateModified;
                            alert('Your photo has been saved successfully.');
                        }, function (error) {
                            console.error(error.data);
                            alert('Error saving your photo :(.');
                        });
                    }
                }, function () {
                    //var photos = $scope.photos || [];
                    //var index = photos.indexOf(e);
                    //photos[index] = originalPhoto;
                    console.log('Modal dismissed at: ' + new Date());
                });
            };
        }]);
})();