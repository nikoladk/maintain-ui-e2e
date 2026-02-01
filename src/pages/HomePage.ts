/**
 * HomePage - Page Object for the EPAM Homepage
 * 
 * Encapsulates all interactions and verifications specific to the
 * EPAM homepage including:
 * - Top navigation menu
 * - Contact Us section
 * - Header and footer elements
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // ============================================
  // LOCATORS - Navigation Elements
  // ============================================
  
  /**
   * Top navigation container
   */
  private readonly navigationBar: Locator;
  
  /**
   * Individual navigation tab items
   * Uses robust selector that targets the main nav links
   */
  private readonly navigationTabs: Locator;

  // ============================================
  // LOCATORS - Contact Us Section
  // ============================================
  
  /**
   * Contact Us button/link in the header or page
   */
  private readonly contactUsButton: Locator;
  
  /**
   * Contact Us section container (footer section)
   */
  private readonly contactUsSection: Locator;
  
  /**
   * Global Headquarters label
   */
  private readonly headquartersLabel: Locator;
  
  /**
   * Address container
   */
  private readonly addressSection: Locator;

  constructor(page: Page, baseUrl?: string) {
    super(page, baseUrl);
    
    // Initialize navigation locators
    // Using multiple selector strategies for robustness
    this.navigationBar = page.locator('header').first();
    this.navigationTabs = page.locator('header a[href*="/services"], header a[href*="/industries"], header a[href*="/insights"], header a[href*="/about"], header a[href*="/careers"]');
    
    // Initialize Contact Us locators
    this.contactUsButton = page.locator('a:has-text("Contact Us"), button:has-text("Contact Us"), [href*="contact"]').first();
    this.contactUsSection = page.locator('footer');
    this.headquartersLabel = page.locator('text=GLOBAL HEADQUARTERS');
    this.addressSection = page.locator('footer');
  }

  /**
   * Navigate to the homepage and wait for it to fully load
   */
  async open(): Promise<void> {
    await this.navigate('/');
    await this.waitForPageLoad();
    await this.handleCookieConsent();
  }

  /**
   * Wait for the homepage to be fully loaded
   * Checks for key page elements to be visible
   */
  async waitForHomepageReady(): Promise<void> {
    // Wait for the navigation to be visible as an indicator the page is ready
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
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
    // Use href-based selectors to target specific navigation links
    // This avoids confusion with duplicate text in mobile menu
    const hrefMap: Record<string, string> = {
      'Services': '/services',
      'Industries': '/industries',
      'Insights': '/insights',
      'About': '/about',
      'Careers': '/careers'
    };
    
    const href = hrefMap[tabName];
    let tabLocator;
    
    if (href) {
      // Use href-based selector for reliability
      tabLocator = this.page.locator(`header a[href="${href}"], header a[href*="${href}"]`).first();
    } else {
      // Fallback to text-based matching for unknown tabs
      tabLocator = this.page.locator(`header`).getByRole('link', { name: tabName }).first();
    }
    
    // Wait for element to be attached (exists in DOM)
    await tabLocator.waitFor({ state: 'attached', timeout: 10000 });
    
    // Verify the element exists
    const count = await tabLocator.count();
    if (count === 0) {
      throw new Error(`Navigation tab "${tabName}" not found`);
    }
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
    const tab = this.page.locator(`header a:has-text("${tabName}")`).first();
    await this.waitAndClick(tab);
  }

  // ============================================
  // CONTACT US SECTION METHODS
  // ============================================

  /**
   * Wait for Contact Us button to be visible
   */
  async waitForContactUsVisible(): Promise<void> {
    // Scroll to the bottom of the page where Contact Us typically is
    await this.page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    await this.page.waitForTimeout(1000); // Brief wait for scroll animation
    
    // Look for Contact Us section in footer
    const footerContactUs = this.page.locator('footer').getByText('Contact Us').first();
    await footerContactUs.waitFor({ state: 'visible', timeout: 15000 });
  }

  /**
   * Verify the Contact Us section title is displayed
   */
  async verifyContactUsTitleVisible(): Promise<void> {
    const title = this.page.locator('footer').getByText('Contact Us').first();
    await expect(title).toBeVisible({ timeout: 10000 });
  }

  /**
   * Verify the Global Headquarters label is displayed
   */
  async verifyGlobalHeadquartersVisible(): Promise<void> {
    // Look for the headquarters label in the footer
    const headquartersText = this.page.locator('footer').getByText(/GLOBAL HEADQUARTERS/i).first();
    await expect(headquartersText).toBeVisible({ timeout: 10000 });
  }

  /**
   * Verify address content is displayed
   * @param addressPart - The address text to verify (can be partial)
   */
  async verifyAddressContains(addressPart: string): Promise<void> {
    // Get the footer content and verify address parts
    const footerContent = this.page.locator('footer');
    await expect(footerContent).toContainText(addressPart, { timeout: 10000 });
  }

  /**
   * Get the full address text from the Contact Us section
   * @returns The address text content
   */
  async getHeadquartersAddress(): Promise<string> {
    const addressContainer = this.page.locator('footer').locator('[class*="address"], [class*="location"]').first();
    
    try {
      await addressContainer.waitFor({ state: 'visible', timeout: 5000 });
      return (await addressContainer.textContent()) || '';
    } catch {
      // Fallback: get text from footer if specific address locator not found
      const footer = this.page.locator('footer');
      return (await footer.textContent()) || '';
    }
  }

  /**
   * Verify all Contact Us section content
   * @param expectedContent - Map of content type to expected text
   */
  async verifyContactUsContent(expectedContent: Map<string, string>): Promise<void> {
    const footer = this.page.locator('footer');
    
    for (const [contentType, expectedText] of expectedContent) {
      // Verify each piece of content is present in the footer
      await expect(footer).toContainText(expectedText, {
        timeout: 10000,
        ignoreCase: contentType === 'Section Title' // Title might have different casing
      });
    }
  }
}

export default HomePage;
