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

function parseEvalOrigin(evalOrigin: string): CallId | null {
  //"eval at <anonymous> (file:///home/nicojs/github/call-id/test/node.test.js:66:12)"
  const origin = /.*\(([^)]*):(\d+):(\d+)\)/.exec(evalOrigin);
  if (origin) {
    return {
      fileName: toFileName(origin[1]),
      line: parseInt(origin[2], 10),
      column: parseInt(origin[3], 10),
    };
  }
  return null;
}

export function getCallIdV8(distance = 0): CallId | null {
  const callSite = getCallSite(getCallIdV8, distance);
  const evalOrigin = callSite.getEvalOrigin();
  if (evalOrigin) {
    return parseEvalOrigin(evalOrigin);
  } else {
    return {
      column: callSite.getColumnNumber(),
      line: callSite.getLineNumber(),
      fileName: toFileName(callSite.getFileName()),
    };
  }
}
