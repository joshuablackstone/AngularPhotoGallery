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
                getPhoto: function (id) {
                    return $http.get(apiUrl + "/" + id);
                },
                postPhoto: function (file) {
                    return Upload.upload(
                        {
                            url: apiUrl + "/createImage",
                            data: { file: file }
                        });
                },
                editPhoto: function (data) {
                    return $http.post(apiUrl + "/updateImage/" + data.Id, angular.toJson(data));
                },
                deletePhoto: function (id) {
                    return $http.post(apiUrl + "/deleteImage/" + id);
                }
            }
        }]);
})();
