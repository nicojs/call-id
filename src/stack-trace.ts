import { CallId } from './call-id';

export function getCallIdStackTrace(distance = 0): CallId | null {
  const stacks = new Error().stack
    ?.split('\n')
    .map((stackLine) => stackLine.trim());

  if (stacks) {
    const stackLine = stacks[distance + 1];
    if (stackLine) {
      return tryParseEval(stackLine) || tryParseNormal(stackLine);
    }
  }
  return null;
}
const evalStackLineRegex = /(?:[^@]*)@(.*) line (\d+) > (?:eval|Function):(\d+):(\d+)/;
function tryParseEval(line: string): CallId | null {
  const maybeMatch = evalStackLineRegex.exec(line);

  return (
    maybeMatch && {
      column: 0,
      fileName: maybeMatch[1],
      line: parseInt(maybeMatch[2], 10),
    }
  );
}

const stackLineRegex = /(?:[^@]*)@(.*):(\d+):(\d+)/;
function tryParseNormal(line: string): CallId | null {
  const maybeMatch = stackLineRegex.exec(line);
  return (
    maybeMatch && {
      fileName: maybeMatch[1],
      line: parseInt(maybeMatch[2], 10),
      column: parseInt(maybeMatch[3], 10),
    }
  );
}

/**
 * Example stack trace:
 * getCallIdStackTrace@http://localhost:9876/base/dist/stack-trace.js:2:17
 * getCallId@http://localhost:9876/base/dist/get-call-id.js:8:16
 * act@http://localhost:9876/base/test/browser.test.js?c534926376518ba58bccfdaf42901cfc0e5761e4:6:14
 * @http://localhost:9876/base/test/browser.test.js?c534926376518ba58bccfdaf42901cfc0e5761e4:12:20
 * callFn@http://localhost:9876/base/node_modules/mocha/mocha.js?359b65d592046ab717953cd710619a139201af2e:22170:22
 * Runnable.prototype.run@http://localhost:9876/base/node_modules/mocha/mocha.js?359b65d592046ab717953cd710619a139201af2e:22156:12
 * Runner.prototype.runTest@http://localhost:9876/base/node_modules/mocha/mocha.js?359b65d592046ab717953cd710619a139201af2e:23809:11
 * next/<@http://localhost:9876/base/node_modules/mocha/mocha.js?359b65d592046ab717953cd710619a139201af2e:23940:13
 *
 *
 * "getCallIdStackTrace@http://localhost:9876/base/dist/esm/stack-trace.js:4:26
 * getCallId@http://localhost:9876/base/dist/esm/get-call-id.js:8:16
 * act@http://localhost:9876/base/test/generated/browser.test.js?0ea514c6aa4d1c42930bfff05a2e0152808f5d07:63:12
 * @http://localhost:9876/base/test/generated/browser.test.js?0ea514c6aa4d1c42930bfff05a2e0152808f5d07 line 73 > eval:1:1
 * @http://localhost:9876/base/test/generated/browser.test.js?0ea514c6aa4d1c42930bfff05a2e0152808f5d07:73:10
 * callFn@http://localhost:9876/base/node_modules/mocha/mocha.js?359b65d592046ab717953cd710619a139201af2e:22170:22
 * Runnable.prototype.run@http://localhost:9876/base/node_modules/mocha/mocha.js?359b65d592046ab717953cd710619a139201af2e:22156:12
 * Runner.prototype.runTest@http://localhost:9876/base/node_modules/mocha/mocha.js?359b65d592046ab717953cd710619a139201af2e:23809:11
 * next/<@http://localhost:9876/base/node_modules/mocha/mocha.js?359b65d592046ab717953cd710619a139201af2e:23940:13
 * next@http://localhost:9876/base/node_modules/mocha/mocha.js?359b65d592046ab717953cd710619a139201af2e:23717:15
 * next/<@http://localhost:9876/base/node_modules/mocha/mocha.js?359b65d592046ab717953cd710619a139201af2e:23727:12
 * next@http://localhost:9876/base/node_modules/mocha/mocha.js?359b65d592046ab717953cd710619a139201af2e:23602:15
 * Runner.prototype.hook/<@http://localhost:9876/base/node_modules/mocha/mocha.js?359b65d592046ab717953cd710619a139201af2e:23694:10
 * timeslice@http://localhost:9876/base/node_modules/mocha/mocha.js?359b65d592046ab717953cd710619a139201af2e:29950:28
 * setTimeout handler*timeslice@http://localhost:9876/base/node_modules/mocha/mocha.js?359b65d592046ab717953cd710619a139201af2e:29954:25
 * setTimeout handler*timeslice@http://localhost:9876/base/node_modules/mocha/mocha.js?359b65d592046ab717953cd710619a139201af2e:29954:25
 * "
 */
