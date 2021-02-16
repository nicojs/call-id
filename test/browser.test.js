// A JS file in order to be sure of the line and column numbers
import { getCallId } from '../dist/index.js';

const { expect } = chai;

describe('browser integration', () => {
  it('should give the correct location when called from a function', () => {
    function act() {
      return getCallId();
    }
    const expected = {
      column: 20,
      line: 15
    };
    const actual = act();
    expect(actual).deep.contains(expected);
    expect(actual.fileName).matches(/^http:\/\/localhost:\d+\/base\/test\/browser.test.js/);
  });
});

