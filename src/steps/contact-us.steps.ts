/**
 * Contact Us Step Definitions
 * 
 * Step definitions for Contact Us section scenarios including:
 * - Contact Us link visibility verification
 * - Footer content validation
 */

import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

/**
 * Step: Verify a link exists on the page (may be hidden in menu)
 */
Then('a {string} link should exist on the page', async function (this: CustomWorld, linkText: string) {
  const link = this.page.locator(`a:has-text("${linkText}")`).first();
  // Check that it exists in the DOM (might be in hamburger menu)
  await expect(link).toHaveCount(1, { timeout: 10000 }).catch(() => {
    // If first check fails, try with multiple elements
    return expect(this.page.locator(`a:has-text("${linkText}")`)).not.toHaveCount(0, { timeout: 5000 });
  });
});

/**
 * Step: Scroll to the footer section
 */
When('the user scrolls to the footer', async function (this: CustomWorld) {
  // Scroll to bottom of page where footer is located
  await this.page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
  await this.page.waitForTimeout(1000); // Allow scroll animation to complete
  
  // Wait for footer to be visible
  const footer = this.page.locator('footer');
  await footer.waitFor({ state: 'visible', timeout: 10000 });
});

/**
 * Step: Verify footer contains expected text
 * Uses DataTable to verify multiple text items
 */
Then('the footer should contain the following text:', async function (this: CustomWorld, dataTable) {
  const textRows = dataTable.hashes() as Array<{ 'Text': string }>;
  
  const footer = this.page.locator('footer');
  
  for (const row of textRows) {
    const expectedText = row['Text'];
    
    // Verify each text is present in footer (case-insensitive)
    await expect(footer).toContainText(expectedText, {
      timeout: 10000,
      ignoreCase: true
    });
    
    console.log(`  ✓ Verified footer contains: "${expectedText}"`);
  }
});

/**
 * Step: Verify link is visible in header (legacy support)
 */
Then('the {string} link should be visible in the header', async function (this: CustomWorld, linkText: string) {
  const link = this.page.locator(`header a:has-text("${linkText}")`).first();
  await expect(link).toBeVisible({ timeout: 10000 });
});

/**
 * Step: Wait for Contact Us button to become visible (legacy support)
 */
When('the {string} button becomes visible', async function (this: CustomWorld, buttonText: string) {
  const button = this.page.locator(`a:has-text("${buttonText}"), button:has-text("${buttonText}")`).first();
  await button.waitFor({ state: 'visible', timeout: 15000 });
});

/**
 * Step: Verify content is displayed (legacy support)
 */
Then('the following content should be displayed:', async function (this: CustomWorld, dataTable) {
  const contentRows = dataTable.hashes() as Array<{ 'Content Type': string; 'Expected Text': string }>;
  
  const page = this.page;
  
  for (const row of contentRows) {
    const contentType = row['Content Type'];
    const expectedText = row['Expected Text'];
    
    await expect(page.locator('body')).toContainText(expectedText, {
      timeout: 10000
    });
    
    console.log(`  ✓ Verified: ${contentType} - "${expectedText}"`);
  }
});
