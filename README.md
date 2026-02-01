# EPAM UI E2E Test Automation Framework

A comprehensive end-to-end UI test automation framework for the EPAM website using **Playwright** and **Cucumber BDD**.

## 🏗️ Project Structure

```
maintain-ui-e2e/
├── features/                    # Gherkin feature files
│   ├── navigation.feature       # Top navigation test scenarios
│   └── contact-us.feature       # Contact Us section scenarios
├── src/
│   ├── pages/                   # Page Object Model classes
│   │   ├── BasePage.ts          # Base page with common methods
│   │   ├── HomePage.ts          # EPAM homepage page object
│   │   └── index.ts             # Page exports
│   ├── steps/                   # Cucumber step definitions
│   │   ├── navigation.steps.ts  # Navigation step definitions
│   │   └── contact-us.steps.ts  # Contact Us step definitions
│   ├── support/                 # Test infrastructure
│   │   ├── hooks.ts             # Cucumber lifecycle hooks
│   │   └── world.ts             # Custom World context
│   └── utils/                   # Utility functions and constants
│       ├── constants.ts         # Test data and configuration
│       └── helpers.ts           # Helper functions
├── reports/                     # Test reports output
│   └── screenshots/             # Failure screenshots
├── cucumber.js                  # Cucumber configuration
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd maintain-ui-e2e
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install chromium
   ```

## 🧪 Running Tests

### Run All Tests (Headless)
```bash
npm test
```

### Run Tests in Headed Mode (Visible Browser)
```bash
npm run test:headed
```

### Run Tests in Debug Mode (Slow Motion)
```bash
npm run test:debug
```

### Run Specific Feature File
```bash
npx cucumber-js features/navigation.feature
```

### Run Tests with Specific Tag
```bash
npx cucumber-js --tags @smoke
```

### Run Tests Excluding a Tag
```bash
npx cucumber-js --tags "not @slow"
```

## 📊 Test Reports

After running tests, reports are generated in the `reports/` directory:

- **HTML Report**: `reports/cucumber-report.html`
- **JSON Report**: `reports/cucumber-report.json`
- **Screenshots**: `reports/screenshots/` (on failures)

## 📝 Test Scenarios

### Scenario 1: Verify Top Navigation Tabs

```gherkin
Given the user navigates to the EPAM website
When the homepage is fully loaded
Then the following top navigation tabs should be visible:
  | Tab Name   |
  | Services   |
  | Industries |
  | Insights   |
  | About      |
  | Careers    |
```

### Scenario 2: Verify Contact Us Section

```gherkin
Given the user navigates to the EPAM website
When the "Contact Us" button becomes visible
Then the following content should be displayed:
  | Content Type       | Expected Text        |
  | Section Title      | Contact Us           |
  | Headquarters Label | GLOBAL HEADQUARTERS  |
  | Address Line 1     | 41 University Drive  |
  | Address Line 2     | Suite 202            |
  | City State Zip     | Newtown, PA 18940    |
  | Country            | USA                  |
```

## 🏷️ Available Tags

- `@smoke` - Smoke test scenarios
- `@navigation` - Navigation-related tests
- `@contact` - Contact section tests
- `@top-nav` - Top navigation specific tests
- `@headquarters` - Headquarters information tests

## 🛠️ Framework Features

### Page Object Model (POM)
- Clean separation between test logic and page interactions
- Reusable page methods
- Easy maintenance when UI changes

### BDD with Cucumber
- Human-readable feature files
- Data-driven testing with DataTables
- Tagged scenarios for selective execution

### Robust Test Design
- Automatic screenshot capture on failures
- Proper wait mechanisms (no arbitrary sleeps)
- Cookie consent handling
- Retry mechanisms for flaky operations

### Reporting
- HTML reports with detailed results
- JSON reports for CI/CD integration
- Screenshots attached to failures

## 📋 Best Practices Implemented

1. **Separation of Concerns**: Page Objects, Step Definitions, and Hooks are clearly separated
2. **Reusable Components**: Common functionality in BasePage class
3. **Data-Driven Testing**: Using DataTables for multiple assertions
4. **Stable Locators**: Using robust selector strategies
5. **Proper Waits**: Using Playwright's built-in wait mechanisms
6. **Error Handling**: Screenshots on failure, meaningful error messages
7. **TypeScript**: Strong typing for better code quality
8. **Configuration Management**: Centralized constants and configuration

## 🔧 Configuration

### Environment Variables

- `HEADED=true` - Run tests with visible browser
- `DEBUG=true` - Run tests in slow motion for debugging

### Cucumber Configuration (`cucumber.js`)

Modify test behavior, timeouts, and report settings

### Playwright Configuration (`playwright.config.ts`)

1. Create feature files in `features/` directory
2. Implement page objects in `src/pages/` 
3. Create step definitions in `src/steps/`
4. Follow existing naming conventions and patterns