describe('Totally fake spies', () => {
    describe("Create Spy", () => {
        beforeEach(
          () => { this.totallyFake = jasmine.createSpy('totallyFake'); });

        it('spies on a function', () => {
            this.totallyFake();
            expect(this.totallyFake).toHaveBeenCalled();
        });

        it('spies on function parameters', () => {
            this.totallyFake(33);
            expect(this.totallyFake).toHaveBeenCalledWith(33);
        });

        it('spies on multipe function parameters', () => {
            this.totallyFake(33, 'mark');
            expect(this.totallyFake).toHaveBeenCalledWith(33, 'mark');
        });

        it('spies on a function but does not call through', () => {
            var next = this.totallyFake(33);
            expect(this.totallyFake).toHaveBeenCalledWith(33);
            expect(next).toBeUndefined();
        });

        it('spies on a function and calls through', () => {
            var next = this.totallyFake(33);
            expect(this.totallyFake).toHaveBeenCalledWith(33);
            expect(this.totallyFake).toHaveBeenCalledWith(jasmine.any(Number));
            expect(next).toBeUndefined();
        });

        it('spies on a function and returns whatever', () => {
            this.totallyFake.and.returnValue(99);
            var next = this.totallyFake(33);
            expect(this.totallyFake).toHaveBeenCalledWith(33);
            expect(this.totallyFake).toHaveBeenCalledWith(jasmine.any(Number));
            expect(next).toBe(99);
        });

        it('spies on a function and calls whatever', () => {
            this.totallyFake.and.callFake((val) => { return val * 2; });
            var next = this.totallyFake(33);
            expect(this.totallyFake).toHaveBeenCalledWith(33);
            expect(next).toBe(66);
        });

        it('spies on a function and throws whatever', () => {
            this.totallyFake.and.throwError('FAKE ERROR');
            expect(() => { this.totallyFake(33); }).toThrowError('FAKE ERROR');
        });

        it('spies on a function and then stubs', () => {
            this.totallyFake.and.throwError('FAKE ERROR');
            expect(() => { this.totallyFake(33); }).toThrowError('FAKE ERROR');

            this.totallyFake.and.stub();
            this.totallyFake(33);
            expect(this.totallyFake).toHaveBeenCalledWith(33);
        });

        it('spies on multiple calls', () => {
            this.totallyFake(33);
            this.totallyFake(27);
            this.totallyFake(2390);

            expect(this.totallyFake.calls.count()).toBe(3);
        });

        it('spies on mulltiple calls and gets arguments', () => {
            this.totallyFake(33);
            this.totallyFake(27);
            this.totallyFake(2390, 'mark');

            expect(this.totallyFake.calls.argsFor(0)).toEqual([ 33 ]);
            expect(this.totallyFake.calls.argsFor(1)).toEqual([ 27 ]);
            expect(this.totallyFake.calls.argsFor(2)).toEqual([ 2390, 'mark' ]);
            expect(this.totallyFake.calls.argsFor(2))
              .toEqual(jasmine.arrayContaining([ 2390 ]));
        });

        it('spies on multiple calls and gets "this"', () => {
            var me = { mark : 'rox' };
            this.totallyFake.call(me, 33);

            var you = { you : 'rule' };
            this.totallyFake.call(you, 55);

            expect(this.totallyFake.calls.first()).toEqual({
                object : me,
                args : [ 33 ],
                returnValue : undefined,
            });

            expect(this.totallyFake.calls.mostRecent()).toEqual({
                object : you,
                args : [ 55 ],
                returnValue : undefined,
            });
        });

        it('spies on multiple calls and resets', () => {
            this.totallyFake(33);
            this.totallyFake(27);
            this.totallyFake(2390);

            expect(this.totallyFake.calls.count()).toBe(3);

            this.totallyFake.calls.reset();
            expect(this.totallyFake.calls.count()).toBe(0);
        });
    });
    describe("Create Spy Object", () => {
        beforeEach(() => {
            this.userStorage = jasmine.createSpyObj('userStorage', [
                'save',
                'get',
                'delete',
                'search',
            ]);

            this.user = new User(this.userStorage);
            this.userData = { name : 'mark', id : 'mark@zzo.com' };
        });

        it('saves a user', () => {
            this.user.save(this.userData);

            expect(this.user).toEqual(jasmine.any(User));
            expect(this.userStorage.save).toHaveBeenCalledWith(this.userData);
        });

        it('gets a user', () => {
            this.userStorage.get.and.returnValue(this.userData);
            var foundUser = this.user.get('mark@zzo.com');

            expect(this.userStorage.get).toHaveBeenCalledWith('mark@zzo.com');
            expect(foundUser).toEqual(this.userData);
        });
    });
});
