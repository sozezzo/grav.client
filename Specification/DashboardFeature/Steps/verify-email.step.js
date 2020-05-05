require("jasmine");
const { setWorldConstructor, Given, Then } = require('cucumber');

const expect = require('expect');
const World = require('../../world');

setWorldConstructor(World);

Given("a list of 2 email addresses", 
  async function(emailAddresses) { });

Then("{string} is valid", async function(validEmail) {
  const result = await this.client.exists(validEmail);
  expect(result.success).toBe(true);
});

Then("{string} is invalid", async function(invalidEmail) {
  const result = await this.client.exists(invalidEmail);
  expect(result.success).toBe(false);
});
