const { setWorldConstructor, Given, When, Then } = require('cucumber');
const { config }  = require('dotenv');
const expect = require('expect');
const InspectAccountFeature = require('../inspect-account.feature.js');

config({ path: 'Tests/.env' });

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

setWorldConstructor(InspectAccountFeature);

Given("I sign in successfully", async function() {
  this.signInUseCase.email = email;
  this.signInUseCase.password = password;
  this.verifyAccountUseCase.client = await this.signInUseCase.execute();
});

When("I check my account", async function() {
  this.result = await this.verifyAccountUseCase.execute();
});

Then("the account check passes", function() {
  expect(this.result).toBe(true);
});
