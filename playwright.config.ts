/**
 * Playwright Configuration
 * 
 * Configuration for Playwright browser automation.
 * This is used when running tests outside of Cucumber context
 * and provides default settings for browser instances.
 */

import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Test timeout
  timeout: 60000,
  
  // Expect timeout for assertions
  expect: {
    timeout: 10000
  },
  
  // Retry failed tests
  retries: 0,
  
  // Number of parallel workers
  workers: 1,
  
  // Reporter configuration
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/playwright-report' }]
  ],
  
  // Shared settings for all tests
  use: {
    // Base URL for navigation
    baseURL: 'https://www.epam.com',
    
    // Browser options
    headless: true,
    
    // Viewport size
    viewport: { width: 1920, height: 1080 },
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video recording
    video: 'retain-on-failure',
    
    // Trace recording for debugging
    trace: 'retain-on-failure',
    
    // Action timeout
    actionTimeout: 15000,
    
    // Navigation timeout
    navigationTimeout: 30000,
    
    // Ignore HTTPS errors
    ignoreHTTPSErrors: true
  },
  
  // Configure projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' }
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' }
    }
  ]
};

export default config;
