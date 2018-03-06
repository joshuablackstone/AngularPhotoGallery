(function () {
    'use strict';

    var app = angular.module('customDirectives', ['customFilters']);

    app.directive('photoPanel', function () {
        return {
            restrict: 'E,A', 
            templateUrl: '/App/views/photoPanel.html',
            scope: {
                model: '=', // Or @ if one way binding
                onDelete: '&'
                //,
               // optionalVariable: '=?'
            },
            link: function (scope, element, attrs, ctrl) {
                scope.deleteImage = function () {
                    var c = confirm('Are you sure?');
                    if (c) {
                        scope.onDelete();
                    }
                };
            }
        }
    });

    app.directive('photoForm', function () {
        return {
            restrict: 'E',
            templateUrl: '/App/views/photoForm.html',
            transclude: true,
            scope: {
                model: '=',
                onSave: '&'
            },
            link: function (scope, element, attrs, ctrl) {
                scope.savePhoto = function (form) {
                    if (!form.$valid) return false;

                    scope.onSave();
                }
            }
        }
    });

    app.directive('dontMatch', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                var modelToMatch = attrs.dontMatch;

                scope.$watch(attrs.dontMatch, function () {
                    ctrl.$validate();
                })

                ctrl.$validators.dontMatch = function (modelValue, viewValue) {
                    return viewValue != scope.$eval(modelToMatch);
                };
            }
        };
    });
})();