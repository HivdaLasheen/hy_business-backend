/**
 * Delays the execution of code for a specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to delay.
 * @returns A promise that resolves after the specified delay.
 */
export default function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
