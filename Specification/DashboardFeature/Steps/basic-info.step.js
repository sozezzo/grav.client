require("jasmine");
const { Then } = require('cucumber');
const expect = require('expect');

Then("get account status", async function() {
  const result = await this.client.exists();
  expect(result.DidSucceed).toBe(true);
});

Then("get current Gravatar info", async function() {
  const result = await this.client.addresses();
  expect(result.DidSucceed).toBe(true);
});
