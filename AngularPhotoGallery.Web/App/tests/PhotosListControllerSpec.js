describe('PhotosListController', function () {
    var $scope, $orderBy;

    beforeEach(module('photosApp'));

    beforeEach(inject(function ($controller, $rootScope, $filter) {
        $scope = $rootScope.$new();
        $orderBy = $filter('orderBy');
        $controller('PhotosListController', { $scope: $scope });
    }));

    it('should return hello world for title', function () {
        expect($scope.title).toBe('Hello World');
    });

    it('should return correct file location for each image', function () {
        var _photos = $scope.photos || [];
        expect(_photos.length).toBe(6);
        angular.forEach(_photos, function (item, index) {
            expect(item.ImageUrl.toString().replace('.jpg', '')).toBe(item.Title);
        });
    });

    it('should return ordered list of photos', function () {
        var _photos = $orderBy($scope.photos, 'Title');
        expect(_photos[5].Title).toBe('Tulips');
    });
});