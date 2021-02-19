/**
 * Represents a call location
 */
export interface CallId {
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
