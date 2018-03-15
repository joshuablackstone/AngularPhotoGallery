describe('PhotosListEditController', function () {
    var $scope, ctrl, httpBackend;
    var serviceUrl = "/api/Images";
    var _model = { Id: 1, Title: 'Chrysanthemum', ImageUrl: 'Chrysanthemum.jpg' };

    beforeEach(module('photosApp'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, $templateCache, $location, $compile) {
        httpBackend = $httpBackend;
        httpBackend
            .when('POST', serviceUrl + "/updateImage/" + _model.Id, _model)
            .respond(200, { data: _model });

        $scope = $rootScope.$new();
        ctrl = $controller('PhotosListEditController', { $scope: $scope, model: _model });

        var element = angular.element(
            '<form name="form">' +
            '<input type="text" name="Title" class="form-control" ng-model="model.Title" ng-maxlength="50" ng-required="true" />' +
            '<textarea name="Description" class="form-control" ng-model="model.Description" ng-maxlength="250" ng-required="false"></textarea>' +
            '</form>'
        );

        ctrl.form = $compile(element)($scope);
    }));

    it('should NOT update photo of ID 1 due to long title', function () {
        // String of 50+ characters shouldnt be allowed
        $scope.form.Title.$setViewValue('Lorem ipsum dolor sit amet, consectetur adipiscinge');
        $scope.$digest();
        //console.log($scope.model);
        expect($scope.form.$valid).toBeFalsy();
        expect($scope.model.Title).toBe(undefined);
    });

    it('should NOT update photo of ID 1 due to long description', function () {
        // String of 250+ characters shouldnt be allowed
        $scope.form.Description.$setViewValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
        $scope.$digest();
        //console.log($scope.model);
        expect($scope.form.$valid).toBeFalsy();
        expect($scope.model.Description).toBe(undefined);
    });

    //it('should update photo of ID 1', function () {
    //    $scope.form.Title.$setViewValue('NewTitle');
    //    $scope.$digest();
    //    expect($scope.form.$valid).toBeTruthy();

    //    httpBackend.expectPOST(serviceUrl + "/updateImage/" + _model.Id, _model).respond(200, _model);
    //    $scope.saveImage($scope.form);
    //    httpBackend.flush();

    //    expect($scope.model.Title).toBe("NewTitle");
    //});
});