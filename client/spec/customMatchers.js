var customMatchers = {
    toBeType : function(util, customEqualityTesters) {
        return {
            compare : function(actual, expected, message) {
                var ret = {};
                if (typeof expected == 'string') {
                    ret.pass = typeof actual == expected;
                    if (ret.pass) {
                        ret.message =
                          `${actual} hey that's a ${expected} ${message}`;
                    } else {
                        ret.message =
                          `${actual} hey that's not a ${expected} ${message}`;
                    }
                } else if (typeof expected == 'function') {
                    ret.pass = actual instanceof expected;
                    if (ret.pass) {
                        ret.message =
                          `${actual} hey that's a ${expected} ${message}`;
                    } else {
                        ret.message =
                          `${actual} hey that's not a ${expected} ${message}`;
                    }
                }
                return ret;
            },
        };
    },
    toBeVisible : function(util, customEqualityTesters) {
        return {
            compare : function(actual, message) {
                return {
                    pass : actual.offsetParent !== null,
                    message : `Element is unexpetedly invisible! ${message}`,
                };
            },
            negativeCompare : function(actual, message) {
                return {
                    pass : actual.offsetParent === null,
                    message : `Element is unexpetedly visible! ${message}`,
                };
            },
        };
    },
};

beforeEach(() => { jasmine.addMatchers(customMatchers); });
