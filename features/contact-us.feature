@contact @smoke
Feature: Contact Us Section Verification
  As a user visiting the EPAM website
  I want to see the Contact Us link and footer information
  So that I can find ways to contact EPAM

  Background:
    Given the user navigates to the EPAM website

  @contact-link
  Scenario: Verify Contact Us link exists
    When the homepage is fully loaded
    Then a "Contact" link should exist on the page

  @footer
  Scenario: Verify footer contains expected sections
    When the user scrolls to the footer
    Then the footer should contain the following text:
      | Text           |
      | OUR BRANDS     |
      | SOCIAL         |
      | CONTACT        |
