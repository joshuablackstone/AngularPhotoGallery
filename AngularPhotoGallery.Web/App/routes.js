(function () {
    'use strict';

    var app = angular.module('photosApp');

    app.constant('routes', [
        {
            url: '/',
            config: {
                templateUrl: '/App/views/PhotosList.Index.html',
                title: 'home',
                settings: {
                    nav: 1,
                    icon: 'glyphicon glyphicon-home',
                    title: 'Home'
                }
            }
        },
        {
            url: '/list',
            config: {
                templateUrl: '/App/views/PhotosList.List.html',
                title: 'list',
                controller: 'PhotosListController',
                settings: {
                    nav: 2,
                    icon: 'glyphicon glyphicon-list-alt',
                    title: 'Photos'
                }
            }
        },
        {
            url: '/create',
            config: {
                templateUrl: '/App/views/PhotosList.Create.html',
                title: 'create',
                controller: 'PhotosListCreateController',
                settings: {}
            }
        },
        {
            url: '/edit/:id',
            config: {
                templateUrl: '/App/views/PhotosList.Edit.html',
                title: 'edit',
                controller: 'PhotosListEditController',
                resolve: {
                    model: ['PhotosListService', '$route', '$location', '$q', function (PhotosListService, $route, $location, $q) {
                        var id = $route.current.params.id;

                        var defer = $q.defer();
                        PhotosListService.getPhoto(id).then(function (data) {
                            defer.resolve(data.data);
                        }, function (error) {
                            console.log(error);
                            $location.path('/');
                            defer.reject(error.data);
                        });

                        return defer.promise;
                    }]
                },
                settings: {}
            }
        }
    ]);

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', '$locationProvider', routeConfigurator]);
    function routeConfigurator($routeProvider, routes, $locationProvider) {
        $locationProvider.hashPrefix('');
        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }
})();