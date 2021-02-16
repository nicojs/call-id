import { CallId } from './call-id.js';
import { getCallIdStackTrace } from './stack-trace.js';
import { getCallIdV8 } from './v8.js';

export function getCallId(distance = 1): CallId | undefined {
  if (isV8()) {
    return getCallIdV8(distance + 1);
  } else {
    return getCallIdStackTrace(distance + 1);
  }
}

function isV8() {
  return !!Error.captureStackTrace;
}
