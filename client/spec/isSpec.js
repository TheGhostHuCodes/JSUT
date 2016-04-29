function createIsCustomMatchers()
{
    var customMatchers = {};
    for (test in is) {
        // get only function that do not start with 'set' (setNamespace &
        // setRegexp)
        if (typeof is[test] == 'function' && !test.match(/^set/)) {
            // Uppercase first letter of function (boolean -> Boolean)
            var firstUp = test.charAt(0).toUpperCase() + test.slice(1);
            (function(origFuncName, upCase) {
                // Create a custom matcher named 'toBeBoolean'
                customMatchers['toBe' + upCase] = function(
                  util, customEqualityTesters) {
                    return {
                        compare : function(actual, expected) {
                            // Capture all arguments (actual + expected)
                            // expect(value).toBeBoolean(false)
                            var args = Array.prototype.slice.call(arguments, 0);
                            var result = {
                                // Get true/false from original 'is' method
                                pass : is[origFuncName].apply(is, args),
                            };
                            return result;
                        },
                    };
                };
                // Get all options for this function (or all of them if not
                // present)
                var options = is[origFuncName].api || [ 'not', 'all', 'any' ];
                options.forEach(function(option) {
                    // Uppercase the option(any -> Any)
                    var optionsUp =
                      option.charAt(0).toUpperCase() + option.slice(1);

                    // Create matcher function named toAnyBeBoolean, to
                    // NotBeBoolean, toAllBeBoolean
                    customMatchers['to' + optionsUp + 'Be' + upCase] = function(
                      util, customEqualityTesters) {
                        return {
                            compare : function(actual, expected) {
                                // Gather all arguments
                                var args =
                                  Array.prototype.slice.call(arguments, 0);
                                var result = {
                                    // Call original is method with option
                                    // (is.any.boolean(...))
                                    pass :
                                      is[option][origFuncName].apply(is, args),
                                };
                                return result;
                            },
                        };
                    };
                });
            })(test, firstUp);
        }
    }
    // this object now has all of our custom 'is' matchers!
    return customMatchers;
}

describe('is.js', () => {
    // Create custom matcher object only once
    var customMatchers = createIsCustomMatchers();

    beforeEach(() => {
        // Add them to jasmine before each test
        jasmine.addMatchers(customMatchers);
    });

    // Ugly way to do it
    it('arguments plain', function() {
        expect(true).toBe(is.arguments(arguments));
        expect(is.arguments(arguments)).toBe(true);
    });

    // Nicer BDD/Jasmine way to do it!
    it('arguments', function() {
        expect(arguments).toBeArguments();
        expect({}).toNotBeArguments();
    });

    it('arguments', function() {
        expect([ arguments, arguments ]).toAllBeArguments();
        expect([ {}, 55, arguments ]).toAnyBeArguments();
        expect([ {} ]).toNotBeArguments();
    });

    it('alpha numeric', () => {
        expect('weiwe').toBeAlphaNumeric();
        expect({}).toNotBeAlphaNumeric();
        expect([ 'weiwe', 55 ]).toAllBeAlphaNumeric();
        expect([ undefined, null, [], 13 ]).toAnyBeAlphaNumeric();
    });

    it('US Zip', () => {
        expect('92009').toBeUsZipCode();
        expect('mark').toNotBeUsZipCode();
    });

    it('Chrome', () => {
        expect().toBeChrome();
        if (is.online()) {
            expect().toBeOnline();
        } else {
            expect().toBeOffline();
        }
    });

    it('Firefox', () => { expect().toNotBeFirefox(); });

    it('Dates', () => {
        expect(new Date()).toBeToday();
        expect(new Date()).toNotBeYesterday();
    });

    it('above', () => {
        expect(5).toNotBeAbove(10);
        expect(22).toBeAbove(10);
    });

    it('within', () => {
        expect(5).toBeWithin(-44, 10);
        expect(5).toNotBeWithin(345, 888);
    });

    it('window', () => {
        expect(window).toBeWindowObject();
        expect({}).not.toBeWindowObject();
        expect(window).not.toNotBeWindowObject(); // FUN!
    });

    it('IPv4', () => { expect('1.2.3.4').toBeIpv4(); });

    it('email', () => {
        expect('mark@zzo.com').toBeEmail();
        expect([
            'mark@zzo.com',
            'mark@yahoo.com',
            'mark@google.com',
        ]).toAllBeEmail();
        expect([ {}, 34, 'mark@zzo.com' ]).toAnyBeEmail();
    });

    it('URL', () => {
        expect('google.com').toBeUrl();
        expect('https://google.com').toBeUrl();
        expect([ 'google.com', 'yahoo.com' ]).toAllBeUrl();
    });
});
