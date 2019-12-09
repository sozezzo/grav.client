Feature: Dashboard feature
  In order to verify my account details
  As a user, I want to perform basic 
  administrative operations

  Scenario: Sign In
    Given email "peter.parker@example.com" and password "letmein"
    When I sign in
    Then I receive a client instance

  Scenario: Perform health check
    * ping the Gravatar service

  Scenario: Get basic info
    * get account status
    * get current Gravatar info