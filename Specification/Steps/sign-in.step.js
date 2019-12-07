const { setWorldConstructor, Given, When, Then } = require('cucumber');
const World = require('../world');
const expect = require('expect');

setWorldConstructor(World);

Given("email {string} and password {string}", function(email, password) {
  this.signInUseCase.email = email;
  this.signInUseCase.password = password;
});

When("I sign in", async function() {
  this.result = await this.signInUseCase.execute();
});

Then("it works", function() {
  expect(this.result).toBeDefined();
});
