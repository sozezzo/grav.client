const { setWorldConstructor, Given, When, Then } = require('cucumber');
const { config }  = require('dotenv');
const expect = require('expect');
const InspectAccountFeature = require('../inspect-account.feature.js');

config({ path: 'Tests/.env' });

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

setWorldConstructor(InspectAccountFeature);

Given("a list of two email addresses", async function(dataTable) {
  const emailAddresses = dataTable.rawTable.map(dataRow => dataRow[0]);
  this.signInUseCase.email = email;
  this.signInUseCase.password = password;
  this.verifyEmailListUseCase.client = await this.signInUseCase.execute();
  this.verifyEmailListUseCase.emailAddresses = emailAddresses;
  expect(this.verifyEmailListUseCase.emailAddresses.length).toBe(2);
});

When("the list is verified", async function(){
  this.result = await this.verifyEmailListUseCase.execute();
  expect(this.result).toBeDefined();
})

Then("{string} is valid", function(validEmail){
  const { client } = this.verifyEmailListUseCase;
  const validEmailHash = client.hashEmail(validEmail);
  expect(this.result[validEmailHash]).toBe(true);
})

Then("{string} is not valid", function(invalidEmail){
  const { client } = this.verifyEmailListUseCase;
  const invalidEmailHash = client.hashEmail(invalidEmail);
  expect(this.result[invalidEmailHash]).toBe(false);
})