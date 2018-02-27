(function () {
    'use strict';

    var controllerId = 'PhotosListShellCtlr';
    var app = angular.module('photosApp');
    app.controller(controllerId, ['$scope', '$window', 'routes', '$route', 
        function ($scope, $window, routes, $route) {
            $scope.navRoutes = routes.filter(function (r) {
                var route = r.config.settings && r.config.settings.nav;
                return route;
            }).sort(function (r1, r2) {
                return r1.config.settings.nav - r2.config.settings.nav;
            });

            /*
                Use this if you want to add a custom class to the link to show active status :)
            */
            $scope.isCurrent = function (route) {
                if (!route.config.title || !$route.current || !$route.current.title) {
                    return '';
                }
                var menuName = route.config.title;
                return $route.current.title.substr(0, menuName.length) === menuName ? 'active' : '';
            };
        }]);
})();
