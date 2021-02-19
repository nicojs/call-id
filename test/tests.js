// These tests get loaded in the templated files at "templates". Should be loaded at line LINE_OFFSET
it('should give the correct location when called from a function', () => {
  function act() {
    return getCallId();
  }
  /**
   * @type {import('../../dist/call-id').CallId}
   */
  const expected = {
    file: FILE_NAME,
    column: 10,
    line: 14 + LINE_OFFSET,
  };
  expect(act()).deep.eq(expected);
});

it('should give the correct location when called with a higher distance function', () => {
  function act() {
    return actualAct();
  }
  function actualAct() {
    return getCallId(2);
  }
  /**
   * @type {import('../../dist/call-id').CallId}
   */
  const expected = {
    file: FILE_NAME,
    column: 10,
    line: 32 + LINE_OFFSET,
  };
  expect(act()).deep.eq(expected);
});

it('should allow distance 0', () => {
  /**
   * @type {import('../../dist/call-id').CallId}
   */
  const expected = {
    file: FILE_NAME,
    column: 10,
    line: 44 + LINE_OFFSET,
  };
  expect(getCallId(0)).deep.eq(expected);
});

it('should work with `eval`', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function act() {
    return getCallId();
  }
  /**
   * @type {import('../../dist/call-id').CallId}
   */
  const expected = {
    file: FILE_NAME,
    column: STRICT_EVAL_COLUMNS ? 10 : 0,
    line: 60 + LINE_OFFSET,
  };
  expect(eval('act()')).deep.eq(expected);
});

it('should work with `new Function`', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function act() {
    return getCallId();
  }
  /**
   * @type {import('../../dist/call-id').CallId}
   */
  const expected = {
    file: FILE_NAME,
    column: STRICT_EVAL_COLUMNS ? 10 : 0,
    line: 77 + LINE_OFFSET,
  };
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  expect(new Function('act', 'return act()')(act)).deep.eq(expected);
});

it('should work with `eval -> eval`', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function act() {
    return getCallId(2);
  }
  /**
   * @type {import('../../dist/call-id').CallId}
   */
  const expected = {
    file: FILE_NAME,
    column: STRICT_EVAL_COLUMNS ? 10 : 0,
    line: 94 + LINE_OFFSET,
  };
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  expect(eval('eval("act()")')).deep.eq(expected);
});
