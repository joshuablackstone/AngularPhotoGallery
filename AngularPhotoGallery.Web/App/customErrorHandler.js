(function () {
    'use strict';

    var app = angular.module('customErrors', []);

    // Configure by setting an optional string value for appErrorPrefix.
    // Accessible via config.appErrorPrefix (via config value).
    app.config(['$provide', function ($provide) {
        $provide.decorator('$exceptionHandler', ['$delegate', function extendExceptionHandler($delegate) {
            return function (exception, cause) {
                var errorData = { exception: exception, cause: cause };
                alert('Sorry, there was an error :(');
                console.log('Custom Error: ' + angular.toJson(errorData));
                $delegate(exception, cause);
            };
         }]);
    }]);
})();