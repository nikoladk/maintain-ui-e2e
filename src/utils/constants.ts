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
  BASE_URL: 'https://demo.nopcommerce.com',
  COMPUTERS: 'https://demo.nopcommerce.com/computers',
  ELECTRONICS: 'https://demo.nopcommerce.com/electronics',
  APPAREL: 'https://demo.nopcommerce.com/apparel',
  DIGITAL_DOWNLOADS: 'https://demo.nopcommerce.com/digital-downloads',
  BOOKS: 'https://demo.nopcommerce.com/books',
  JEWELRY: 'https://demo.nopcommerce.com/jewelry',
  GIFT_CARDS: 'https://demo.nopcommerce.com/gift-cards'
} as const;

/**
 * Expected Navigation Tabs
 */
export const NAVIGATION_TABS = [
  'Computers',
  'Electronics',
  'Apparel',
  'Digital downloads',
  'Books',
  'Jewelry',
  'Gift Cards'
] as const;

/**
 * nopCommerce Footer Information
 */
export const FOOTER_SECTIONS = {
  INFORMATION: 'INFORMATION',
  CUSTOMER_SERVICE: 'CUSTOMER SERVICE',
  MY_ACCOUNT: 'MY ACCOUNT',
  FOLLOW_US: 'FOLLOW US'
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
