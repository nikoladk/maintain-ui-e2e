/**
 * Cucumber Hooks - Test Lifecycle Management
 * 
 * Hooks run at specific points in the test lifecycle:
 * - Before: Setup before each scenario
 * - After: Cleanup and reporting after each scenario
 * - BeforeAll: One-time setup before all tests
 * - AfterAll: One-time cleanup after all tests
 */

import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import * as fs from 'fs';
import * as path from 'path';

// Set global timeout for all steps (60 seconds for CI environments)
setDefaultTimeout(60000);

/**
 * BeforeAll Hook
 * Runs once before all scenarios - setup test infrastructure
 */
BeforeAll(async function () {
  console.log('\n🚀 Starting E2E Test Suite...\n');
  
  // Ensure reports directory exists
  const reportsDir = path.join(process.cwd(), 'reports');
  const screenshotsDir = path.join(reportsDir, 'screenshots');
  
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
});

/**
 * Before Hook
 * Runs before each scenario - initialize browser and page
 */
Before(async function (this: CustomWorld, scenario) {
  // Store scenario name for logging/debugging
  this.testName = scenario.pickle.name;
  
  console.log(`\n📋 Starting Scenario: ${this.testName}`);
  
  // Initialize browser and page for this scenario
  await this.initBrowser();
});

/**
 * Before Hook for tagged scenarios
 * Example: Add specific setup for @slow tagged tests
 */
Before({ tags: '@slow' }, async function (this: CustomWorld) {
  // Increase timeout for slow tests
  this.context.setDefaultTimeout(60000);
});

/**
 * After Hook
 * Runs after each scenario - cleanup and capture results
 */
After(async function (this: CustomWorld, scenario) {
  const status = scenario.result?.status;
  
  // Log scenario result
  const statusEmoji = status === Status.PASSED ? '✅' : status === Status.FAILED ? '❌' : '⚠️';
  console.log(`${statusEmoji} Scenario "${this.testName}" - ${status}`);
  
  // Capture screenshot on failure for debugging
  if (status === Status.FAILED) {
    try {
      const screenshotName = `FAILED-${this.testName.replace(/[^a-zA-Z0-9]/g, '_')}-${Date.now()}`;
      const screenshot = await this.takeScreenshot(screenshotName);
      
      // Attach screenshot to Cucumber report
      this.attach(screenshot, 'image/png');
      
      console.log(`📸 Screenshot saved: reports/screenshots/${screenshotName}.png`);
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
    }
  }
  
  // Always close the browser after scenario
  await this.closeBrowser();
});

/**
 * AfterAll Hook
 * Runs once after all scenarios - final cleanup and reporting
 */
AfterAll(async function () {
  console.log('\n✨ E2E Test Suite Completed!\n');
  console.log('📊 Reports available in: reports/');
});
