describe('custom matchers 2', () => {
    describe('toBeVisible', () => {
        beforeEach(() => {
            document.getElementById('html-fixture').innerHTML =
              '<div id="mark"></div>';
        });
        afterEach(() => { document.getElementById('html-fixture').innerHTML = ''; });

        it('toBeVisible simple', () => {
            var elem = document.getElementById('mark');
            expect(elem).toBeVisible('where is mark?');
            expect(document.body).not.toBeVisible('body has offset?');
        });
    });
});
