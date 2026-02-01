/**
 * Test Constants
 * 
 * Centralized configuration values and test data
 * Makes it easy to update values across all tests
 */

/**
 * Application URLs
 */
export const URLS = {
  BASE_URL: 'https://www.epam.com',
  SERVICES: 'https://www.epam.com/services',
  INDUSTRIES: 'https://www.epam.com/industries',
  INSIGHTS: 'https://www.epam.com/insights',
  ABOUT: 'https://www.epam.com/about',
  CAREERS: 'https://www.epam.com/careers'
} as const;

/**
 * Expected Navigation Tabs
 */
export const NAVIGATION_TABS = [
  'Services',
  'Industries',
  'Insights',
  'About',
  'Careers'
] as const;

/**
 * EPAM Global Headquarters Information
 */
export const HEADQUARTERS = {
  LABEL: 'GLOBAL HEADQUARTERS',
  STREET: '41 University Drive',
  SUITE: 'Suite 202',
  CITY: 'Newtown',
  STATE: 'PA',
  ZIP: '18940',
  COUNTRY: 'USA',
  FULL_ADDRESS: '41 University Drive Suite 202, Newtown, PA 18940 USA'
} as const;

/**
 * Timeout configurations (in milliseconds)
 */
export const TIMEOUTS = {
  DEFAULT: 30000,
  SHORT: 5000,
  MEDIUM: 15000,
  LONG: 60000,
  PAGE_LOAD: 30000,
  ELEMENT_VISIBLE: 10000,
  ANIMATION: 1000
} as const;

/**
 * Viewport configurations
 */
export const VIEWPORTS = {
  DESKTOP: { width: 1920, height: 1080 },
  LAPTOP: { width: 1366, height: 768 },
  TABLET: { width: 768, height: 1024 },
  MOBILE: { width: 375, height: 812 }
} as const;
