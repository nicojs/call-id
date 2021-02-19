[![CI](https://github.com/nicojs/call-id/actions/workflows/ci.yml/badge.svg)](https://github.com/nicojs/call-id/actions/workflows/ci.yml)

# Call ID

Get the location from where you're called from; a minimalist approach.

Supports both V8 (Chrome, Edge, Opera, NodeJS) and SpiderMonkey (FireFox).

## 🗺 Install

Install with npm or yarn:

```shell
npm i call-id
# OR
yarn add call-id
```

This package comes with its TypeScript type declarations included.

## 🎁 Example

```js
// file.js
import { getCallId } from 'call-id';

function it(title, fn) {
  const { file, line, column } = getCallId();
  // file: file.js, line: 9, column: 0
}

it('should work', () => {}); // <-- this is line 9
```

The `getCallId` function is available in 3 ways:
* An es module: `import { getCallId } from 'call-id'`
* A cjs module: `const { getCallId } = require('call-id')`
* A browser script bundle: `<script src="node_modules/call-id/dist/browser/index.js">` and use `const { getCallId } = window.callId;`



## 🤯 Why?

Test frameworks might be interested in where you're tests get declared. They can provide a richer user experience. For example, point you to the exact location where your failing tests can be found.

## 📖 API reference

### `getCallId(distance: number = 1): CallId | null`

Gets the location from where you're called. This returns `null` if the provided `distance` exceeds the call stack, or couldn't be found otherwise.

You can provide a `distance` (default is `1`) of larger then `1` if you want to go even further back on the call stack. Use `0` to receive the exact location from where you called `getCallId`.

### CallId

A `CallId` object is returned from `getCallId`.

```ts
/**
 * Represents a call location
 */
interface CallId {
  /**
   * The file name or URL of the call location.
   */
  file: string;
  /**
   * The column number of the call location (or `0` if couldn't be determined).
   */
  column: number;
  /**
   * The line number of the call location (starts at `1`)
   */
  line: number;
}
```