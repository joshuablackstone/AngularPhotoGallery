(function () {
    'use strict';

        /*
   Angular UI: https://angular-ui.github.io/bootstrap/ 'ui.bootstrap'
   Dir-Pagination: https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination 'angularUtils.directives.dirPagination'
   Angular Loading Bar: https://github.com/chieffancypants/angular-loading-bar 'angular-loading-bar'
   NG File Upload: https://github.com/danialfarid/ng-file-upload 'ngFileUpload'
   */

    //var photosApp = angular.module('photosApp', []);
    var photosApp = angular.module('photosApp', ['ui.bootstrap', 'ngFileUpload', 'angularUtils.directives.dirPagination']);
})();