describe('custom matchers', () => {
    describe('toBeType', () => {
        it('toBeType basic', () => {
            expect([]).toBeType('object', 'type is wrong!');
            expect([]).toBeType(Object, 'not function');
            expect(4).toBeType('number');
        });

        it('toBeType custom', () => {
            function Car() {}
            var myCar = new Car();
            expect(myCar).toBeType(Car);
            expect(myCar).toBeType('object');
        });

        it('toBeType nulls', () => {
            expect(null).toBeType('object');
            expect(null).not.toBeType(Object);
        });

        it('toBeType undefined', () => {
            var a;
            expect(a).toBeType('undefined');
            expect(a).not.toBeType(Function);
        });

        it('toBeType functions', () => {
            var a = function() {};
            expect(a).toBeType('function');
            expect(a).toBeType(Function);
        });
    });
});

