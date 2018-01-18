(function () {
    'use strict';

    var photosApp = angular.module('photosApp');

    photosApp.controller('PhotosListController', ['$scope', function ($scope) {
        $scope.title = 'Hello World';

        $scope.photos = [
            { Title: 'Chrysanthemum', ImageUrl: 'Chrysanthemum.jpg' },
            { Title: 'Desert', ImageUrl: 'Desert.jpg' },
            { Title: 'Koala', ImageUrl: 'Koala.jpg' },
            { Title: 'Hydrangeas', ImageUrl: 'Hydrangeas.jpg' },
            { Title: 'Tulips', ImageUrl: 'Tulips.jpg' },
            { Title: 'Lighthouse', ImageUrl: 'Lighthouse.jpg' }
        ];
    }]);
})();