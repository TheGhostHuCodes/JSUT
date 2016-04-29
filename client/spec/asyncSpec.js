jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

describe('async', () => {
    beforeAll(done => { setTimeout(done, 0); });

    afterAll(done => { setTimeout(done, 60); }, 100);

    beforeEach(function(done) {
        setTimeout(() => {
            this.then = new Date();
            done();
        }, 50);
    }, 100);

    afterEach(done => { setTimeout(done, 50); }, 100);

    it('is asynchronous!', function(done) {
        setTimeout(() => {
            expect(this.then).toBeLessThan(new Date());
            done();
        }, 50);
    });

    it('fails asynchronously!', function(done) {
        setTimeout(() => {
            expect(this.then).toBeLessThan(new Date());
            done.fail('not looking good');
        }, 50);
    });

    it('throws sync', () => { throw new Error('this will fail'); });

    it('throws async', function(done) {
        setTimeout(() => {
            expect(this.then).toBeLessThan(new Date());
            throw new Error('this will timeout');
        }, 50);
    });
});
