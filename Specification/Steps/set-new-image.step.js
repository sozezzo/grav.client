const { setWorldConstructor, Given, When, Then, BeforeAll, AfterAll } = require('cucumber');
const World = require('../world');
const expect = require('expect');
const { imageUrl } = require('../../Release/Common/TestDoubles/primitive-stubs');

setWorldConstructor(World);

let originalPrimaryImageName = "";
let newImageName = "";

BeforeAll((testCase, callback) => {
  const _world = new World();
  _world.getPrimaryImageUseCase.execute()
  .then(imageName => originalPrimaryImageName = imageName)
  .then(callback);
})

Given("an image", function() {
  expect(imageUrl).toBeDefined();
});

When("I upload the image", async function() {
  this.setNewImageUseCase.imageUrl = imageUrl;
  newImageName = await this.setNewImageUseCase.execute();
  expect(newImageName).toBeDefined();
});

Then("it is set as the primary image", function() {
  setTimeout(async () => {
    const primaryImageName = await this.getPrimaryImageUseCase.execute();
    expect(newImageName).toEqual(primaryImageName);
  }, 1000);
});

AfterAll((testCase, callback) => {
  const _world = new World();
  setTimeout(async () => {
    _world.client.useUserImage(originalPrimaryImageName)
          .then(() => _world.client.deleteUserImage(newImageName))
          .then(callback)
          
  }, 1000);
})
