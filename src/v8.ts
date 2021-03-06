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
): NodeJS.CallSite | null {
  const originalPrepare = Error.prepareStackTrace;
  try {
    Error.prepareStackTrace = ErrorWithCallSite.prepareStackTrace;
    // @ts-expect-error This is really a call site, because of the new `prepareStackTrace` implementation
    const stack: NodeJS.CallSite[] = new ErrorWithCallSite(from).stack;
    return stack[distance] ?? null;
  } finally {
    Error.prepareStackTrace = originalPrepare;
  }
}

export function getCallIdV8(distance = 0): CallId | null {
  const callSite = getCallSite(getCallIdV8, distance);
  return callSite && (tryParseEvalOrigin(callSite) || parseCallSite(callSite));
}

function tryParseEvalOrigin(callSite: NodeJS.CallSite): CallId | null {
  //"eval at <anonymous> (file:///home/nicojs/github/call-id/test/node.test.js:66:12)"
  const origin = /.*\(([^)]+):(\d+):(\d+)\)/.exec(
    callSite.getEvalOrigin() ?? ''
  );
  if (origin) {
    return {
      file: toFileName(origin[1]),
      line: parseInt(origin[2], 10),
      column: parseInt(origin[3], 10),
    };
  }
  return null;
}

function parseCallSite(callSite: NodeJS.CallSite): CallId | null {
  const fileUrl = callSite.getFileName();
  const line = callSite.getLineNumber();
  if (fileUrl !== null && line !== null) {
    return {
      column: callSite.getColumnNumber() ?? 0,
      line,
      file: toFileName(fileUrl),
    };
  }
  return null;
}
