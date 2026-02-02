# EPAM UI E2E Test Automation Framework

End-to-end UI test automation framework using **Playwright** and **Cucumber BDD**.

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
