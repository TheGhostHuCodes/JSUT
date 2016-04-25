describe('setup / teardown', () => {
    var foo = [ 'an', 'array' ];

    // THIS IS JASMINE SUITE OBJECT NOT VISIBLE TO TESTS
    console.log(this);

    beforeAll(() => {
        // HERE this is an empty object
        console.log('top-level beforeAll', this);
        foo = 99;
        this.thisVar = 11;
        this.myVar = 'myvar';
    });

    // Run after all tests and sub-tests in this suite finish
    afterAll(() => {
        console.log('top-level afterAll', this);
        foo = 'afterAll';
        this.thisVar = 'afterAll';
    });

    describe('setup / teardown nested', () => {
        // Here 'this' is SUITE object NOT visible to tests
        // This foo will get overridden by beforeEach
        foo = 'SOMETHING ELSE';

        beforeAll(() => {
            // Run once right after outer scope beforeAll
            console.log('    nested beforeAll', this);
        });

        // Run after all tests and sub-tests in this suite finish
        afterAll(() => {
            // Run once right after outer scope beforeAll
            console.log('    nested afterAll', this);
        });

        beforeEach(() => {
            // This is run after any outer 'beforeEach'
            console.log('    nested beforeEach', this);
        });

        afterEach(() => {
            // This is run before any outer 'afterEach'
            console.log('    nested afterEach', this);
        });

        it("foo should be 'mark'", () => {
            console.log('    nexted first test');
            expect(foo).toBe('mark');
            this.inTest = 'SETTING THIS IN A TEST';
        });

        it('this.thisVar should be 11', () => {
            console.log('    nested second test');
            expect(this.thisVar).toBe(11);
        });
    });

    beforeEach(() => {
        // RUN BEFORE EVERY TEST FROM HERE ON DOWN!
        // THIS IS RESET!
        console.log('top-level beforeEach', this);
        foo = 'mark';
    });

    afterEach(() => {
        console.log('top-level afterEach', this);
        foo = 'zozo';
    });

    it('foo should be "mark"', () => {
        console.log('top-level test 1');
        expect(foo).toBe('mark');
    });

    it('this.thisVar should be 11', () => {
        console.log('top-level test 2');
        expect(this.thisVar).toBe(11);
    });
});

describe('setup / teardown async', () => {
    var boo = 66;

    beforeEach(done => {
        setTimeout(done, 50);
        this.someVar = 44;
    }, 3000);

    it('boo should be 66', () => { expect(boo).toBe(66); });

    it('this.someVar should be 44', () => { expect(this.someVar).toBe(44); });
});
