export function toFileName(input: string | undefined | null): string | null {
  if (input === undefined || input === null) {
    return null;
  } else if (input.startsWith('file:')) {
    const url = new URL(input);
    if (url.protocol === 'file:') {
      return url.pathname;
    }
  }
  return input;
}
