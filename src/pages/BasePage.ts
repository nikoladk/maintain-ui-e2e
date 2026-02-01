/**
 * BasePage - Abstract base class for all Page Objects
 * 
 * Provides common functionality shared across all pages including:
 * - Page navigation
 * - Common element interactions
 * - Wait utilities
 * - Screenshot capture
 */

import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly baseUrl: string;

  constructor(page: Page, baseUrl: string = 'https://www.epam.com') {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  /**
   * Navigate to a specific path on the website
   * @param path - The path to navigate to (relative to base URL)
   */
  async navigate(path: string = '/'): Promise<void> {
    const url = `${this.baseUrl}${path}`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Wait for the page to fully load
   * Handles network idle state and key page elements
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if an element is visible on the page
   * @param locator - The Playwright locator for the element
   * @param timeout - Maximum time to wait for visibility (default: 10s)
   */
  async isElementVisible(locator: Locator, timeout: number = 10000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Scroll to an element to ensure it's in the viewport
   * @param locator - The element to scroll to
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Wait for element to be visible and then click it
   * @param locator - The element to click
   */
  async waitAndClick(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Get the current page URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Get the page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Take a screenshot for debugging purposes
   * @param name - The name for the screenshot file
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `reports/screenshots/${name}-${Date.now()}.png`,
      fullPage: true
    });
  }

  /**
   * Accept cookies/consent dialogs if present
   * Many websites show cookie consent banners that may interfere with tests
   */
  async handleCookieConsent(): Promise<void> {
    try {
      // EPAM website uses "ACCEPT ALL" button for cookie consent
      const acceptButton = this.page.locator('button:has-text("ACCEPT ALL"), button:has-text("Accept All"), button:has-text("Accept")').first();
      if (await acceptButton.isVisible({ timeout: 5000 })) {
        await acceptButton.click();
        // Wait for dialog to close
        await this.page.waitForTimeout(500);
      }
    } catch {
      // Cookie consent not present or already handled - continue
    }
  }

  /**
   * Wait for any loading spinners to disappear
   */
  async waitForLoadingComplete(): Promise<void> {
    const loadingIndicators = this.page.locator('[class*="loading"], [class*="spinner"]');
    try {
      await loadingIndicators.waitFor({ state: 'hidden', timeout: 10000 });
    } catch {
      // No loading indicators found - continue
    }
  }
}
