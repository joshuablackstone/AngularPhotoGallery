(function () {
    'use strict';

    var app = angular.module('photosAppServices', []);

    app.factory('PhotosListService', ['$http', '$q', function ($http, $q) {
        return {
            getPhotos: function () {
                var photos = [
                    { Title: 'Chrysanthemum', ImageUrl: 'Chrysanthemum.jpg' },
                    { Title: 'Desert', ImageUrl: 'Desert.jpg' },
                    { Title: 'Koala', ImageUrl: 'Koala.jpg' },
                    { Title: 'Hydrangeas', ImageUrl: 'Hydrangeas.jpg' },
                    { Title: 'Tulips', ImageUrl: 'Tulips.jpg' },
                    { Title: 'Lighthouse', ImageUrl: 'Lighthouse.jpg' }
                ];

                return $q.when({ data: photos });
            }
        }
    }]);
})();