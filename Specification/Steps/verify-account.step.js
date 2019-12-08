const { Given, Then } = require('cucumber');
const expect = require('expect');

Given("a Gravatar client", async function() {
  expect(this.verifyAccountUseCase.client).toBeDefined();
});

Then("the account check passes", async function() {
  const result = await this.verifyAccountUseCase.execute();
  expect(result).toBe(true);
});

Then("I can get the primary gravatar image", async function() {
  const imageName = await this.getPrimaryImageUseCase.execute();
  expect(imageName).toBeDefined();
});
