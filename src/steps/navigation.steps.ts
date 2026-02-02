/**
 * Navigation Step Definitions
 * 
 * Step definitions for navigation-related scenarios including:
 * - Page navigation
 * - Top navigation verification
 * - Menu interactions
 */

import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

/**
 * Step: Navigate to the nopCommerce website
 * Opens the homepage and waits for initial load
 * Includes explicit wait for main content to handle CI timeouts
 */
Given('the user navigates to the nopCommerce website', async function (this: CustomWorld) {
  await this.homePage.open();
  // Explicitly wait for a key element to ensure the page is fully loaded
  // This helps with flaky CI environments where network can be slow
  await this.page.waitForSelector('.header', { state: 'visible', timeout: 30000 });
});

/**
 * Step: Wait for homepage to fully load
 * Ensures all critical page elements are ready
 */
When('the homepage is fully loaded', async function (this: CustomWorld) {
  await this.homePage.waitForHomepageReady();
});

/**
 * Step: Verify navigation tabs are visible
 * Uses DataTable to check multiple tabs
 * 
 * @param dataTable - Cucumber DataTable with tab names
 */
Then('the following navigation tabs should be visible:', async function (this: CustomWorld, dataTable) {
  // Extract tab names from the data table
  const expectedTabs: string[] = dataTable.hashes().map((row: { 'Tab Name': string }) => row['Tab Name']);
  
  console.log(`\n📋 Verifying ${expectedTabs.length} navigation tabs...`);
  
  // Verify each tab is visible
  for (const tabName of expectedTabs) {
    await this.homePage.verifyNavigationTabVisible(tabName);
  }
  
  console.log(`✅ All navigation tabs verified successfully!\n`);
});

/**
 * Step: Verify a single navigation tab
 * Alternative step for verifying one tab at a time
 */
Then('the {string} navigation tab should be visible', async function (this: CustomWorld, tabName: string) {
  await this.homePage.verifyNavigationTabVisible(tabName);
});

/**
 * Step: Click on a navigation tab
 * For scenarios that need to interact with navigation
 */
When('the user clicks on the {string} navigation tab', async function (this: CustomWorld, tabName: string) {
  await this.homePage.clickNavigationTab(tabName);
});

/**
 * Step: Verify page URL contains expected path
 * Useful after navigation to verify correct page
 */
Then('the URL should contain {string}', async function (this: CustomWorld, expectedPath: string) {
  const currentUrl = this.homePage.getCurrentUrl();
  expect(currentUrl).toContain(expectedPath);
});
