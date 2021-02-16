import { CallId } from './call-id';

const stackLineRegex = /(?:[^@]*)@(.*):(\d+):(\d+)/;

export function getCallIdStackTrace(distance = 0): CallId | undefined {
  const stacks = new Error().stack
    ?.split('\n')
    .map((stackLine) => stackLine.trim());
  if (stacks) {
    const stackLine = stacks[distance + 1];
    if (stackLine) {
      const match = stackLineRegex.exec(stackLine);
      if (match) {
        return {
          fileName: match[1],
          line: parseInt(match[2], 10),
          column: parseInt(match[3], 10),
        };
      }
    }
  }
  return;
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
 */
