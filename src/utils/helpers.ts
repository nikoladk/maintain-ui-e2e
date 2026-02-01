/**
 * Test Helpers
 * 
 * Utility functions for common test operations
 * @version 1.0.1
 */

import { Page } from 'playwright';

/**
 * Wait for a specified amount of time
 * Use sparingly - prefer waiting for specific conditions
 * @param ms - Milliseconds to wait
 */

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
 

/**
 * Retry a function until it succeeds or max retries reached
 * Useful for handling flaky operations
 * 
 * @param fn - The async function to retry
 * @param maxRetries - Maximum number of retry attempts
 * @param delayMs - Delay between retries in millisecond
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | undefined;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      console.log(`Retry attempt ${attempt}/${maxRetries} failed: ${lastError.message}`);
      
      if (attempt < maxRetries) {
        await sleep(delayMs);
      }
    }
  }
  
  throw lastError;
}

/**
 * Generate a unique test identifier
 * Useful for creating unique test data
 */
export function generateTestId(): string {
  return `test-${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

/**
 * Sanitize a string for use in file names
 * @param name - The string to sanitize
 */
export function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
}

/**
 * Check if the page has any JavaScript errors
 * Useful for detecting runtime errors during tests
 * 
 * @param page - Playwright page instance
 * @returns Array of console error messages
 */
export async function captureConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  return errors;
}

/**
 * Wait for network to be idle
 * Useful when waiting for AJAX requests to complete
 * 
 * @param page - Playwright page instance
 * @param timeout - Maximum time to wait
 */
export async function waitForNetworkIdle(page: Page, timeout: number = 5000): Promise<void> {
  try {
    await page.waitForLoadState('networkidle', { timeout });
  } catch {
    // Network might not become fully idle, continue anyway
    console.log('Warning: Network did not become idle within timeout');
  }
}
