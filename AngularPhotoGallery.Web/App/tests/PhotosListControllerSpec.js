describe('PhotosListController', function () {
    var $scope, ctrl, $orderBy, httpBackend;

    beforeEach(module('photosApp'));

    var serviceUrl = "/api/Images";
    var photos = [
        { Id: 1, Title: 'Chrysanthemum', ImageUrl: 'Chrysanthemum.jpg' },
        { Id: 2, Title: 'Desert', ImageUrl: 'Desert.jpg' },
        { Id: 3, Title: 'Koala', ImageUrl: 'Koala.jpg' },
        { Id: 4, Title: 'Hydrangeas', ImageUrl: 'Hydrangeas.jpg' },
        { Id: 5, Title: 'Tulips', ImageUrl: 'Tulips.jpg' },
        { Id: 6, Title: 'Lighthouse', ImageUrl: 'Lighthouse.jpg' }
    ];

    beforeEach(inject(function ($controller, $rootScope, $filter, $httpBackend) {
        httpBackend = $httpBackend;
        httpBackend.expectGET(serviceUrl).respond(200, photos);

        $scope = $rootScope.$new();
        $orderBy = $filter('orderBy');
        ctrl = $controller('PhotosListController', { $scope: $scope });
    }));

    //it('should return value for title', function () {
    //    expect($scope.title).toBeDefined();
    //});

    it('should return ordered list of photos', function () {
        httpBackend.flush();
        var _photos = $orderBy($scope.photos, 'Title');
        expect(_photos[0].Title).toBe('Chrysanthemum');
    });

    it('should remove photo of ID 6', function () {
        var image = photos[5];
        $scope.deleteImage(image);
        httpBackend.expectPOST(serviceUrl + "/deleteImage/" + image.Id).respond(200, '');
        httpBackend.flush();
        expect($scope.photos.indexOf(image)).toBe(-1);
        expect($scope.photos.length).toBe(5);
    });
});