import { CallId } from './call-id.js';
import { getCallIdStackTrace } from './stack-trace.js';
import { getCallIdV8 } from './v8.js';

/**
 * Gets the location from where you're called. This returns `null` if the provided `distance` exceeds the call stack, or couldn't be found otherwise.
 * @param distance Provide a custom distance (default is `1`) of larger then `1` if you want to go even further back on the call stack. Use `0` to receive the exact location from where you called `getCallId`.
 */
export function getCallId(distance = 1): CallId | null {
  if (isV8()) {
    return getCallIdV8(distance + 1);
  } else {
    return getCallIdStackTrace(distance + 1);
  }
}

function isV8() {
  return typeof Error.captureStackTrace === 'function';
}
