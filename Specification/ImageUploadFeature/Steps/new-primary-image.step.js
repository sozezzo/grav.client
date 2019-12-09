const { When, Then, BeforeAll, AfterAll } = require('cucumber');
const expect = require('expect');
const World = require('../../world');
const { join }= require('path');

let originalPrimaryImageName = "";
let newImageName = "";

BeforeAll(async () => {
  const _world = new World();
  const imageName = await _world.getPrimaryImageUseCase.execute();
  originalPrimaryImageName = imageName;
})

When("an image is uploaded", async function() {
  const imagePath = join(__dirname, '../../../Common/Assets/shrimp.jpg');
  this.setNewImageUseCase.imagePath = imagePath;
  newImageName = await this.setNewImageUseCase.execute();
  expect(newImageName).toBeDefined();
});

Then("the primary image is updated", async function() {
  setTimeout(async () => {
    const primaryImageName = await this.getPrimaryImageUseCase.execute();
    expect(newImageName).toEqual(primaryImageName);
  }, 2000);
});

AfterAll(() => {
  const world = new World();
  setTimeout(async () => {
    await world.client.useUserImage(originalPrimaryImageName);
    await world.client.deleteUserImage(newImageName);
  }, 3000);
})
