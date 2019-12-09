Feature: Image upload
  In order to add new images 
  to my Gravatar collection
  As a user, I want to upload images

Scenario: Set New Image
       Given an image
       When I upload the image
       Then the primary image is updated