(function () {
    'use strict';

    var app = angular.module('customFilters', []);

    app.filter('abbreviated', function () {
        return function (item, length) {
            if (item != null) {
                var _value = item.toString();
                length = length || 5;
                if (_value.length <= length) {
                    return _value;
                }

                return _value.substring(0, length) + '...';
            }
            return "";
        }
    });

    app.filter('bytes', function () {
        return function (bytes, precision) {
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
            if (typeof precision === 'undefined') precision = 1;
            var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
                number = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
        }
    });
})();