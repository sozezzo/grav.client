const { setWorldConstructor, Given, Then } = require('cucumber');
const { VerifyEmailListUseCase } = require('../../../Release/Application/verify-email-list.use-case');

const expect = require('expect');
const World = require('../../world');
const verifyEmailList = new VerifyEmailListUseCase();
let exists = null;

setWorldConstructor(World);

Given("a list of 2 email addresses", async function(emailAddresses) {
  verifyEmailList.client = this.client;
  verifyEmailList.emailAddresses = emailAddresses.rawTable.map(address => address[0]);
  exists = await verifyEmailList.execute();
});

Then("{string} is valid", async function(validEmail) {
  const emailHash = await this.client.hashEmail(validEmail);
  expect(exists[emailHash]).toBe(true);
});

Then("{string} is invalid", async function(invalidEmail) {
  const emailHash = await this.client.hashEmail(invalidEmail);
  expect(exists[emailHash]).toBe(false);
});
