const { expect } = require('chai');
const { getCallId } = require('..');

// A JS file in order to be sure of the line and column numbers
describe('node cjs', () => {
  it('should give the correct location when called from a function', () => {
    function act() {
      return getCallId();
    }
    /**
     * @type {import('../../dist/call-id').CallId}
     */
    const expected = {
      fileName: __filename,
      column: 12,
      line: 18
    };
    expect(act()).deep.eq(expected);
  });
});
