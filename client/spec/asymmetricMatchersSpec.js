describe('bonus matchers within other matchers', () => {
    describe('jasmine.any', () => {
        it('jasmine.any with builtins', () => {
            expect({}).toEqual(jasmine.any(Object));
            expect([]).toEqual(jasmine.any(Object));
            expect(null).toEqual(jasmine.any(Object));
            expect(5).toEqual(jasmine.any(Number));
            expect('5').toEqual(jasmine.any(String));
            expect(() => ({})).toEqual(jasmine.any(Function));
        });

        it('jasmine.any with custom', () => {
            class User
            {
                constructor() { this.name = 'User'; }
            }
            var user = new User();
            expect(user).toEqual(jasmine.any(User));
            expect(user).toEqual(jasmine.any(Object));
        });

        it('jasmine.any with custom inheritance', () => {
            class Person
            {
                constructor() { this.name = 'Person'; }
            }
            class User extends Person
            {
                constructor()
                {
                    super();
                    this.name = 'User';
                }
            }
            var user = new User();
            expect(user).toEqual(jasmine.any(Object));
            expect(user).toEqual(jasmine.any(Person));
            expect(user).toEqual(jasmine.any(User));
        });
    });

    describe('jasmine.anything', () => {
        it('matches anything not "null" or "undefined"', () => {
            expect(true).toEqual(jasmine.anything());
            expect(false).toEqual(jasmine.anything());
            expect(0).toEqual(jasmine.anything());
            expect('').toEqual(jasmine.anything());
            expect(null).not.toEqual(jasmine.anything());
            expect(undefined).not.toEqual(jasmine.anything());
        });
    });

    describe('jasmine.objectContaining', () => {
        beforeEach(() => { this.obj = { mark : 'rox', you : 'also rock' }; });
        it('matches some key/value pairs', () => {
            expect(this.obj).toEqual(
              jasmine.objectContaining({ mark : 'rox' }));
            expect(this.obj).toEqual(
              jasmine.objectContaining({ you : 'also rock' }));
            expect(this.obj).toEqual(
              jasmine.objectContaining({ mark : 'rox', you : 'also rock' }));
            expect(this.obj).toEqual(
              jasmine.objectContaining({ mark : jasmine.anything() }));
            expect(this.obj).toEqual(
              jasmine.objectContaining({ mark : jasmine.any(String) }));
            expect(this.obj).not.toEqual(
              jasmine.objectContaining({ they : 'are great' }));
        });
    });

    describe('jasmine.arrayContaining', () => {
        beforeEach(() => {
            this.array = [ 'red', 'green', 'blue', 'purple' ];
        });

        it('matches some array items', () => {
            expect(this.array)
              .toEqual(jasmine.arrayContaining([ 'purple', 'blue' ]));
            expect(this.array)
              .not.toEqual(jasmine.arrayContaining([ 'orange', 'blue' ]));
            expect(this.array).not.toEqual(jasmine.arrayContaining([ 55 ]));
            expect(this.array)
              .toEqual(jasmine.arrayContaining([ jasmine.anything() ]));
            expect(this.array).toEqual(jasmine.arrayContaining([ jasmine.any(
              String) ]));
        });
    });

    describe('jasmine.stringMatching', () => {
        beforeEach(() => {
            this.string = 'The quick brown fox jumps over the lazy dog.';
        });

        it('matches strings regex style', () => {
            expect('mark').toEqual(jasmine.stringMatching(/^mark$/));
            expect('super-duper').toEqual(jasmine.stringMatching(/r-d/));
        });
    });

    describe('asymmetricMatch', () => {
        beforeEach(() => {
            this.chewbaccaMatch = {
                asymmetricMatch :
                  (actual) => { return actual.match(/chew(ie|bacca)/i); },
            };
        });

        it('matches!', () => {
            expect('chewbacca').toEqual(this.chewbaccaMatch);
            expect('cHEWIE').toEqual(this.chewbaccaMatch);
        });

        it("it doesn't!", () => {
            expect('han').not.toEqual(this.chewbaccaMatch);
            expect('luke').not.toEqual(this.chewbaccaMatch);
        });
    });
});
