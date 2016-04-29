describe('es6 promise matchers', () => {
    beforeEach(function() {
        beforeEach(JasminePromiseMatchers.install);

        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    });

    it('resolved', function(done) {
        this.resolve();
        expect(this.promise).toBeResolved(done);
    });

    it('resolved with', function(done) {
        this.resolve('HOWDY');
        expect(this.promise).toBeResolvedWith('HOWDY', done);
    });

    it('rejected', function(done) {
        this.reject();
        expect(this.promise).toBeRejected(done);
    });

    it('rejected with', function(done) {
        this.reject('ERROR');
        expect(this.promise).toBeRejectedWith('ERROR', done);
    });
});
