import { CallId } from './call-id.js';
import { toFileName } from './util.js';

class ErrorWithCallSite extends Error {
  constructor(from: (...args: any[]) => any) {
    super();
    Error.captureStackTrace(this, from);
  }
  public static prepareStackTrace(err: Error, stack: NodeJS.CallSite[]) {
    return stack;
  }
}

function getCallSite(
  from: (...args: any) => any,
  distance: number
): NodeJS.CallSite {
  const originalPrepare = Error.prepareStackTrace;
  try {
    Error.prepareStackTrace = ErrorWithCallSite.prepareStackTrace;
    // @ts-expect-error This is really a call site, because of the new `prepareStackTrace` implementation
    const stack: NodeJS.CallSite[] = new ErrorWithCallSite(from).stack;
    return stack[distance];
  } finally {
    Error.prepareStackTrace = originalPrepare;
  }
}

export function getCallIdV8(distance = 0): CallId {
  const callSite = getCallSite(getCallIdV8, distance);
  return {
    column: callSite.getColumnNumber(),
    line: callSite.getLineNumber(),
    fileName: toFileName(callSite.getFileName()),
  };
}
