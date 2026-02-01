/**
 * Custom World - Cucumber Test Context
 * 
 * The World is Cucumber's context object that is shared across all steps
 * within a single scenario. It holds:
 * - Browser and page instances
 * - Page objects
 * - Test configuration
 * - Helper methods
 */

import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from 'playwright';
import { HomePage } from '../pages';

/**
 * Extended World parameters from cucumber configuration
 */
interface CustomWorldParameters {
  baseUrl: string;
  defaultTimeout: number;
}

/**
 * CustomWorld class extending Cucumber's World
 * Provides browser automation context for all step definitions
 */
export class CustomWorld extends World {
  // Browser instances
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  
  // Page Objects
  homePage!: HomePage;
  
  // Configuration
  baseUrl: string;
  defaultTimeout: number;
  
  // Test state
  testName: string = '';

  constructor(options: IWorldOptions) {
    super(options);
    
    // Extract world parameters from cucumber config
    const params = options.parameters as CustomWorldParameters;
    this.baseUrl = params?.baseUrl || 'https://www.epam.com';
    this.defaultTimeout = params?.defaultTimeout || 30000;
  }

  /**
   * Initialize the browser and create a new page
   * Called in the Before hook
   */
  async initBrowser(): Promise<void> {
    // Determine if running headless or headed mode
    // Default is headed (non-headless) unless HEADLESS=true is set
    const isHeadless = process.env.HEADLESS === 'true';
    const isDebug = process.env.DEBUG === 'true';
    
    // Launch browser - headed by default for easier debugging
    this.browser = await chromium.launch({
      headless: isHeadless,
      slowMo: isDebug ? 100 : 50 // Slight slowdown for visibility
    });
    
    // Create browser context with viewport and other settings
    this.context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
      ignoreHTTPSErrors: true,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    
    // Set default timeout for all actions
    this.context.setDefaultTimeout(this.defaultTimeout);
    
    // Create a new page
    this.page = await this.context.newPage();
    
    // Initialize page objects
    this.initPageObjects();
  }

  /**
   * Initialize all page objects with the current page instance
   */
  private initPageObjects(): void {
    this.homePage = new HomePage(this.page, this.baseUrl);
  }

  /**
   * Clean up browser resources
   * Called in the After hook
   */
  async closeBrowser(): Promise<void> {
    if (this.page) {
      await this.page.close();
    }
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }

  /**
   * Take a screenshot for reporting
   * @param name - Name for the screenshot
   * @returns Buffer containing the screenshot
   */
  async takeScreenshot(name?: string): Promise<Buffer> {
    const screenshotName = name || `screenshot-${Date.now()}`;
    return await this.page.screenshot({
      path: `reports/screenshots/${screenshotName}.png`,
      fullPage: true
    });
  }
}

// Register the custom world constructor with Cucumber
setWorldConstructor(CustomWorld);
