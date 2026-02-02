@footer @smoke
Feature: Footer Verification
  As a user visiting the nopCommerce demo website
  I want to see the footer information
  So that I can find useful links and information

  Background:
    Given the user navigates to the nopCommerce website

  @footer-info
  Scenario: Verify footer contains expected sections
    When the user scrolls to the footer
    Then the footer should contain the following text:
      | Text              |
      | INFORMATION       |
      | CUSTOMER SERVICE  |
      | MY ACCOUNT        |
      | FOLLOW US         |
