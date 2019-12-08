Feature: SignInFeature
       In order to consume the Gravatar XML-RPC API
       As a user
       I want to sign in

Scenario: Sign In
       Given email "peter.parker@example.com" and password "letmein"
       When I sign in
       Then it works