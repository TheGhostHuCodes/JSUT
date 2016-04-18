/*global fetchPerson*/
describe('fetch people', function() {
    beforeAll(function() {
        this.fixture = document.getElementById('html-fixture');
    });

    beforeEach(function() {
        this.fixture.innerHTML =
          '<input id="pid" type="number" value="33"></input><div id="person"></div>';
    });

    afterEach(function() { this.fixture.innerHTML = ''; });

    it('should return a Promise', function() {
        var x = fetchPerson(1);
        expect(typeof x.then).toBe('function');
    });

    it('should call swapi with correct params', function(done) {
        spyOn(window, 'fetch').and.returnValue(Promise.resolve({
            ok : true,
            blob : function() {
                return new Blob([ JSON.stringify({ high : 'mighty' }) ],
                                { type : 'application/json' });
            },
        }));
        var x = fetchPerson(1);
        expect(window.fetch)
          .toHaveBeenCalledWith('https://swapi.co/api/people/1/?format=json');
        x.then(function(person) {
            expect(person.high).toBe('mighty');
            done();
        });
    });
});
