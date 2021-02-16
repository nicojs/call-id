import { expect } from 'chai';
import { getCallId } from '../dist/get-call-id.js';

// A JS file in order to be sure of the line and column numbers
describe('call-id integration', () => {
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
      line: 18
    };
    expect(act()).deep.eq(expected);
  });
});
