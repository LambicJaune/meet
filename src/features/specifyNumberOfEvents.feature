Feature: Specify Number of Events

  Scenario: User can set the number of events to display
    Given the user is on the main event list page
    When the user enters a number (e.g., 5) in the "Number of events" input field
    Then only that number of events (e.g., 5) should be displayed

  Scenario: Default number of events is shown when user hasn’t specified
    Given the user hasn’t entered any number in the "Number of events" input
    When the app loads
    Then a default number of events (e.g., 32) should be displayed