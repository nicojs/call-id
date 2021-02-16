export function toFileName(input: string | undefined | null): string | null {
    if (input === undefined || input === null) {
        return null;
    } else {
        const url = new URL(input);
        if (url.protocol === 'file:') {
            return url.pathname;
        } else {
            return input;
        }
    }
}
