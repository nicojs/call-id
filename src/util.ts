export function toFileName(input: string): string {
  if (input.startsWith('file:')) {
    const url = new URL(input);
    if (url.protocol === 'file:') {
      return url.pathname;
    }
  }
  return input;
}
