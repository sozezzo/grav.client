require("jasmine");
const { setWorldConstructor, Given, When, Then } = require('cucumber');
const expect = require('expect');
const World = require('../../world');

setWorldConstructor(World);

Given("email {string} and password {string}", function(email, password) {
  this.client.email = email;
  this.signInUseCase.password = password;
});

When("I sign in", async function() {
  this.client = await this.signInUseCase.execute();
});

Then("I receive a client instance", function() {
  expect(this.client).toBeDefined();
});
