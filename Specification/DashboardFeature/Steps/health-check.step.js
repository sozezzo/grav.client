const { Then } = require('cucumber');
const expect = require('expect');

Then("ping the Gravatar service", async function() {
  const result = await this.client.test();
  expect(result.DidSucceed).toBe(true);
});
