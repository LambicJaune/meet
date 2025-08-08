Feature: Show/Hide Event Details

  Scenario: User can show event details
    Given a list of upcoming events is displayed
    When the user clicks on “Show Details” for a specific event
    Then the detailed information for that event should be displayed

  Scenario: User can hide event details
    Given event details are currently visible for a specific event
    When the user clicks on “Hide Details”
    Then the detailed information for that event should be hidden
