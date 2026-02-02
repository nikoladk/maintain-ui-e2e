@navigation @smoke
Feature: Top Navigation Verification
  As a user visiting the nopCommerce demo website
  I want to see the main navigation tabs
  So that I can easily navigate to different sections of the store

  Background:
    Given the user navigates to the nopCommerce website

  @tabs
  Scenario: Verify main category tabs are visible
    When the homepage is fully loaded
    Then the following navigation tabs should be visible:
      | Tab Name          |
      | Computers         |
      | Electronics       |
      | Apparel           |
      | Digital downloads |
      | Books             |
      | Jewelry           |
      | Gift Cards        |
