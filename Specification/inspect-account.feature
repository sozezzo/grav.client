Feature: InspectAccountFeature
       In order to verify account details
       As a user
       I want to inspect my account

Scenario: Verify Account
       Given a client
       When I check my account
       Then the account check passes

Scenario: Verify Email List
       Given a list of two email addresses
              |askmrtillman@gmail.com|
              |user@example.com|
       When the list is verified 
       Then "askmrtillman@gmail.com" is valid
       And "user@example.com" is not valid