Feature: VerifyFeature
       As a user
       I want to verify 
       my account details

Scenario: Verify Account
       Given a Gravatar client
       Then the account check passes
       And I can get the primary gravatar image

Scenario: Verify Email List
       Given a list of two email addresses
              |askmrtillman@gmail.com|
              |user@example.com|
       When the list is verified 
       Then "askmrtillman@gmail.com" is valid
       And "user@example.com" is not valid