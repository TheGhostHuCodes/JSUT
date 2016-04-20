describe('Basic Matchers', () => {
    it('toBe: ===', () => {
        expect(5).toBe(5, 'hey it is not 5!');
        expect('5').not.toBe(5, '===string vs int!');
        expect({ testing : 'is', awesome : 'yo!' })
          .not.toBe({ testing : 'is', awesome : 'yo!' });
    });

    it('toEqual === + object inspection', () => {
        expect(5).toEqual(5);
        expect('5').not.toEqual(5);
        expect('5').not.toEqual('thirty seven');

        expect([ 1, 2, 3 ]).toEqual([ 1, 2, 3 ]);
        expect({ testing : 'is', awesome : 'yo!' })
          .toEqual({ testing : 'is', awesome : 'yo!' });
        expect(() => ({})).not.toEqual(() => ({}));
    });

    it('toMatch - regex for strings', () => {
        expect("mary had a little lamb").toMatch('lamb');
        expect("mary had a little lamb").toMatch(/HAD A/i);
        expect("mary had a little lamb").not.toMatch(/billy/);
    });

    it('toBeDefined', () => {
        var b = 33;
        expect(b).toBeDefined();

        var a;
        expect(a).not.toBeDefined();

        var m = {};
        expect(m.property).not.toBeDefined();
    });

    it('toBeUndefined', () => {
        var b = 33;
        expect(b).not.toBeUndefined();

        var a;
        expect(a).toBeUndefined();

        var m = {};
        expect(m.property).toBeUndefined();
    });

    it('toBeNull', done => {
        var nu = null;
        expect(nu).toBeNull();

        var a;
        expect(a).not.toBeNull();

        const async = cb => { cb(null, 'it worked!'); };

        async((err, undefined) => {
            expect(err).toBeNull();
            done();
        });
    });

    it('toBeTruthy', () => {
        expect('').not.toBeTruthy();
        expect([]).toBeTruthy();
        expect({}).toBeTruthy();
        expect(0).not.toBeTruthy();
        expect('0').toBeTruthy();
        expect(false).not.toBeTruthy();
    });

    it('toBeFalsy', () => {
        expect('').toBeFalsy();
        expect([]).not.toBeFalsy();
        expect([ 0 ]).not.toBeFalsy();
        expect(0).toBeFalsy();
        expect('0').not.toBeFalsy();
        expect(null).toBeFalsy();
        expect(undefined).toBeFalsy();
        expect(NaN).toBeFalsy();
        expect(-0).toBeFalsy();
    });

    it('toContain', function(done) {
        expect([ 1, 2, 4 ]).toContain(4);
        expect([ 1, 2, 4 ]).not.toContain('2');
        expect([ 1, 2, 4 ]).not.toContain(undefined);
        expect(arguments).toContain(done);
        done();
    });

    it('toBeGreaterThan / toBeLessThan', () => {
        expect(5).toBeGreaterThan(4);
        expect(3).not.toBeGreaterThan('4');

        expect(5).toBeLessThan(99);
        expect(5).not.toBeLessThan(-Infinity);
    });

    it('toBeCloseTo', () => {
        expect(1.2).toBeCloseTo(1, 0);
        expect(1.2).not.toBeCloseTo(1, 1);

        expect(5.768).toBeCloseTo(5.762, 0);
        expect(5.768).toBeCloseTo(5.762, 1);

        // Rounds up, so match.
        expect(5.768).toBeCloseTo(5.769, 2);

        // Rounds down, so doesn't match!
        expect(5.768).not.toBeCloseTo(5.762, 2);

        expect(5.768).not.toBeCloseTo(5.762, 3);
    });

    it('toThrow', () => {
        function throwing() { throw new Error('throwing!'); }
        expect(throwing).toThrow();

        function notThrowing() {}
        expect(notThrowing).not.toThrow();

        function maybeThrowing()
        {
            if (this.throw) {
                throw new Error('throwing!');
            }
        }
        expect(maybeThrowing.bind({ throw : true })).toThrow();
        expect(maybeThrowing.bind({ throw : false })).not.toThrow();
    });

    it('toThrowError', () => {
        function throwing() { throw new RangeError('throwing!'); }
        expect(throwing).toThrowError('throwing!');
        expect(throwing).toThrowError(/throw/);
        expect(throwing).toThrowError(RangeError);

        class MyError extends Error
        {
            constructor(message)
            {
                super(message);
                this.message = message;
                this.name = 'MyError';
            }
        }

        function myThrowing() { throw new MyError('throwing!'); }
        expect(myThrowing).toThrowError('throwing!');
        expect(myThrowing).toThrowError(/throw/);
        expect(myThrowing).toThrowError(MyError);
        expect(myThrowing).not.toThrowError(RangeError);
    });
});
