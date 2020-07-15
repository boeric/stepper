/* test-babel.test.js */
/* global test, expect */

import testBabel from './test-babel';

test('string from default export', () => {
  expect(testBabel()).toMatch('default export/import works');
});
