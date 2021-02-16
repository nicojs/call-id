import { expect } from 'chai';
import { getCallId } from '../dist/index.js';

// A JS file in order to be sure of the line and column numbers
describe('node esm', () => {
  it('should give the correct location when called from a function', () => {
    function act() {
      return getCallId();
    }
    /**
     * @type {import('../../dist/call-id').CallId}
     */
    const expected = {
      fileName: new URL(import.meta.url).pathname,
      column: 12,
      line: 18,
    };
    expect(act()).deep.eq(expected);
  });
});
