const { Given, When, Then } = require('cucumber');
const expect = require('expect');

Given("a client", async function() {
  expect(this.verifyAccountUseCase.client).toBeDefined();
});

When("I check my account", async function() {
  this.result = await this.verifyAccountUseCase.execute();
});

Then("the account check passes", function() {
  expect(this.result).toBe(true);
});
