require("jasmine");
const { Then } = require('cucumber');
const expect = require('expect');

Then("set primary Gravatar icon to the next image", async function() {
  const imageName = await this.loadNextImageUseCase.execute();
  expect(imageName).toBeDefined();
});

Then("set primary Gravatar icon to the previous image", async function() {
  const imageName = await this.loadPreviousImageUseCase.execute();
  expect(imageName).toBeDefined();
});
