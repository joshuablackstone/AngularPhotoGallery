(function () {
    'use strict';

    var app = angular.module('photosApp');

    app.factory('PhotosListService', ['$http', '$q', 'Upload',
        function ($http, $q, Upload) {
            var apiUrl = "/api/Images";

            return {
                getPhotos: function () {
                   return $http.get(apiUrl);
                },
                postPhoto: function (file) {
                    return Upload.upload(
                        {
                            url: apiUrl + "/createImage",
                            data: { file: file }
                        });
                },
                deletePhoto: function (id) {
                    return $http.post(apiUrl + "/deleteImage/" + id);
                }
            }
        }]);
})();
