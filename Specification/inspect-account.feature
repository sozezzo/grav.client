Feature: InspectAccountFeature
       In order to verify account details
       As a user
       I want to inspect my account

Scenario: Verify Account
       Given I sign in successfully
       When I check my account
       Then the account check passes

# Scenario: Check Email List