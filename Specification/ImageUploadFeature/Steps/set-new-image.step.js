const { Given, When, Then, BeforeAll, AfterAll } = require('cucumber');
const expect = require('expect');
const { imageUrl } = require('../../../Release/Common/TestDoubles/primitive-stubs');
const World = require('../../world');

let originalPrimaryImageName = "";
let newImageName = "";

BeforeAll((callback) => {
  const _world = new World();
  _world.getPrimaryImageUseCase.execute()
  .then(imageName => originalPrimaryImageName = imageName);
  callback();
})

Given("an image", function() {
  expect(imageUrl).toBeDefined();
});

When("I upload the image", async function() {
  this.setNewImageUseCase.imageUrl = imageUrl;
  newImageName = await this.setNewImageUseCase.execute();
  expect(newImageName).toBeDefined();
});

Then("the primary image is updated", function() {
  setTimeout(async () => {
    const primaryImageName = await this.getPrimaryImageUseCase.execute();
    expect(newImageName).toEqual(primaryImageName);
  }, 1000);
});

AfterAll((callback) => {
  const _world = new World();
  setTimeout(async () => {
    _world.client.useUserImage(originalPrimaryImageName)
          .then(() => _world.client.deleteUserImage(newImageName))
  }, 1000);
  callback();
})
