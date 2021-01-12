/* eslint-env node, jest */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

describe('snowpack-plugin-markdown-html', () => {
  describe('examples', () => {
    describe.each(glob.sync('./examples/*'))('%s', (fixture) => {
      it('emits expected index.html', () => {
        const contents = fs.readFileSync(
          path.join(fixture, './build/index.html'),
          'utf-8',
        );
        expect(contents).toMatchSnapshot();
      });
    });
  });
});
