const { setWorldConstructor, Given, When, Then } = require('cucumber');
const SignInFeature = require('../sign-in.feature.js');
const { SignInUseCase } = require('../../Release/Application/sign-in.use-case');

const expect = require('expect');

setWorldConstructor(SignInFeature);

Given("email {string} and password {string}", function(email, password) {
  this.signInUseCase = new SignInUseCase();
  this.signInUseCase.email = email;
  this.signInUseCase.password = password;
});

When("I sign in", async function() {
  this.result = await this.signInUseCase.execute();
});

Then("it works", function() {
  expect(this.result).toBeDefined();
});
