[![CI](https://github.com/nicojs/call-id/actions/workflows/ci.yml/badge.svg)](https://github.com/nicojs/call-id/actions/workflows/ci.yml)

# Call ID

Get the location from where you're called from.

## Example

```js
// file.js
import { getCallId } from 'call-id';

function it(title, fn) {
  const { fileName, line, column } = getCallId();
  // fileName: file.js, line: 9, column: 0
}

it('should work', () => {});
```
