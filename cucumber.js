/**
 * Cucumber.js Configuration
 * 
 * This file configures how Cucumber runs tests, including:
 * - Feature file locations
 * - Step definition paths
 * - Report formats
 * - Runtime options
 */

const config = {
  // Require TypeScript compilation
  requireModule: ['ts-node/register'],
  
  // Step definitions and support files
  require: [
    'src/steps/**/*.ts',
    'src/support/**/*.ts'
  ],
  
  // Feature files location
  paths: ['features/**/*.feature'],
  
  // Output format
  format: [
    'progress-bar',
    'html:reports/cucumber-report.html',
    'json:reports/cucumber-report.json'
  ],
  
  // Parallel execution (can be adjusted based on needs)
  parallel: 1,
  
  // Fail fast on first failure (set to false for full test run)
  failFast: false,
  
  // Retry failed scenarios (useful for flaky tests)
  retry: 0,
  
  // Tags to filter scenarios (can be overridden via CLI)
  // tags: '@smoke',
  
  // Strict mode - fail if there are pending/undefined steps
  strict: true,
  
  // Timeout for each step (in milliseconds)
  // Note: Individual step timeouts can be set in hooks
  worldParameters: {
    baseUrl: 'https://demo.nopcommerce.com',
    defaultTimeout: 30000
  }
};

module.exports = {
  default: config
};
