(function () {
    'use strict';

    var app = angular.module('customDirectives', ['customFilters']);

    app.provider('photoPanelTemplate', function () {
        var templatePath = '/App/views/photoPanel.html';

        this.setPath = function (path) {
            templatePath = path;
        };

        this.$get = function () {
            return {
                getPath: function () {
                    return templatePath;
                }
            };
        };
    });

    app.directive('photoPanel', ['photoPanelTemplate', function (photoPanelTemplate) {
        return {
            restrict: 'E,A', 
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || photoPanelTemplate.getPath();
            },
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
    }]);

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