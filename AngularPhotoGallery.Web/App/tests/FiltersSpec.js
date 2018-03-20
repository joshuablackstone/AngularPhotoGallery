describe('CustomFilters', function () {
    var $abbreviated;

    beforeEach(module('customFilters'));

    beforeEach(inject(function ($filter) {
        $abbreviated = $filter('abbreviated');
    }));

    it('should return abbreviated value of length second param for string', function () {  
        var longString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
        var trimmedLength = 25;
        var elipseLength = 3;
        var shortString = $abbreviated(longString, trimmedLength);
        //console.log(shortString);
        expect(shortString.length).toBe(trimmedLength + elipseLength);
    });

    it('should return abbreviated value for string', function () {
        var longString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
        var shortString = $abbreviated(longString);
        expect(shortString.length).toBe(8);
    });
});