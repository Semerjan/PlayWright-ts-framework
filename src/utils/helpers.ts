/**
 * Generates a random string of given length.
 */
export function randomString(length = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Generates a random email address for testing.
 */
export function randomEmail(): string {
  return `test.${randomString(6)}@clearight.dev`;
}

/**
 * Waits for a given number of milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Formats a number as USD currency string.
 */
export function formatAsCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Parses a price string like "$29.99" into a float.
 */
export function parsePriceString(price: string): number {
  return parseFloat(price.replace('$', ''));
}

/**
 * Returns today's date as YYYY-MM-DD.
 */
export function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}
