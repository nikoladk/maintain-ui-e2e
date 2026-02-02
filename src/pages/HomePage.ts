/**
 * HomePage - Page Object for the nopCommerce Demo Homepage
 * 
 * Encapsulates all interactions and verifications specific to the
 * nopCommerce homepage including:
 * - Top navigation menu (category tabs)
 * - Header and footer elements
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // ============================================
  // LOCATORS - Navigation Elements
  // ============================================
  
  /**
   * Top navigation container with category menu
   */
  private readonly navigationBar: Locator;
  
  /**
   * Individual category navigation tabs
   * Uses robust selector that targets the main category links
   */
  private readonly navigationTabs: Locator;

  // ============================================
  // LOCATORS - Footer Section
  // ============================================
  
  /**
   * Footer section container
   */
  private readonly footerSection: Locator;

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl);
    
    // Initialize navigation locators for nopCommerce
    this.navigationBar = page.locator('.header-menu');
    this.navigationTabs = page.locator('.top-menu > li > a');
    
    // Initialize footer locators
    this.footerSection = page.locator('.footer');
  }

  /**
   * Navigate to the homepage and wait for it to fully load
   */
  async open(): Promise<void> {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  /**
   * Wait for the homepage to be fully loaded
   * Checks for key page elements to be visible
   */
  async waitForHomepageReady(): Promise<void> {
    // Wait for the navigation menu to be visible as an indicator the page is ready
    await this.page.waitForLoadState('domcontentloaded');
    await this.navigationBar.waitFor({ state: 'visible', timeout: 15000 });
  }

  // ============================================
  // NAVIGATION METHODS
  // ============================================

  /**
   * Get all visible navigation tab names
   * @returns Array of navigation tab text values
   */
  async getNavigationTabNames(): Promise<string[]> {
    await this.navigationTabs.first().waitFor({ state: 'visible', timeout: 10000 });
    
    // Get all navigation items and extract their text
    const tabs = await this.navigationTabs.all();
    const tabNames: string[] = [];
    
    for (const tab of tabs) {
      const text = await tab.textContent();
      if (text && text.trim()) {
        tabNames.push(text.trim());
      }
    }
    
    return tabNames;
  }

  /**
   * Verify that a specific navigation tab is visible
   * @param tabName - The name of the tab to verify
   */
  async verifyNavigationTabVisible(tabName: string): Promise<void> {
    // Find the tab by its text content in the top menu
    const tabLocator = this.page.locator('.top-menu > li > a').filter({ hasText: tabName });
    
    // Wait for element to be visible
    await tabLocator.waitFor({ state: 'visible', timeout: 10000 });
    
    // Verify the element exists
    const count = await tabLocator.count();
    if (count === 0) {
      throw new Error(`Navigation tab "${tabName}" not found`);
    }
    
    console.log(`  ✓ Verified navigation tab: "${tabName}"`);
  }

  /**
   * Verify multiple navigation tabs are visible
   * @param expectedTabs - Array of tab names to verify
   */
  async verifyAllNavigationTabsVisible(expectedTabs: string[]): Promise<void> {
    for (const tabName of expectedTabs) {
      await this.verifyNavigationTabVisible(tabName);
    }
  }

  /**
   * Click on a specific navigation tab
   * @param tabName - The name of the tab to click
   */
  async clickNavigationTab(tabName: string): Promise<void> {
    const tab = this.page.locator('.top-menu > li > a').filter({ hasText: tabName });
    await this.waitAndClick(tab);
  }
}

export default HomePage;
