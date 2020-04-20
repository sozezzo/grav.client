require("jasmine");
const { When, Then, AfterAll } = require('cucumber');
const expect = require('expect');
const { imageUrl } = require('../../../Release/Common/TestDoubles/primitive-stubs');
const { join } = require('path');
const { readFileSync } = require('fs');
const World = require('../../world');
let imageNames = { bubba:'', gump:'', shrimp: '' };

let _userImages = [];

When("an image file is uploaded", async function() {
  const imagePath = join(__dirname, '../../../Common/Assets/bubba.jpg');
  const result = await this.client.saveImage(imagePath);
  imageNames.bubba = result.Value.imageName;
  expect(result.DidSucceed).toBe(true);
});

Then("an encoded image is uploaded", async function() {
  const imgPath = join(__dirname, '../../../Common/Assets/gump.jpg');
  const bitmap = readFileSync(imgPath);
  const imageData = Buffer.from(bitmap).toString('base64');
  const result = await this.client.saveEncodedImage(imageData, 'jpeg');
  imageNames.gump = result.Value.imageName;
  expect(result.DidSucceed).toBe(true);
});

Then("an image url is uploaded", async function() {
  const result = await this.client.saveImageUrl(imageUrl);
  imageNames.shrimp = result.Value.imageName;
  expect(result.DidSucceed).toBe(true);
});

Then("the image file is found", async function() {
  const result = await this.client.userImages();
  _userImages = result.Value.userImages;
  const image = _userImages.find(image => image.name == imageNames.bubba);
  expect(image).toBeDefined();
});

Then("the encoded image is found", async function() {
  const image = _userImages.find(image => image.name == imageNames.gump);
  expect(image).toBeDefined();
});

Then("the image url is found", async function() {
  const image = _userImages.find(image => image.name == imageNames.shrimp);
  expect(image).toBeDefined();
});

AfterAll(async () => {
  const world = new World();
  await world.client.deleteUserImage(imageNames.bubba);
  await world.client.deleteUserImage(imageNames.gump);
  await world.client.deleteUserImage(imageNames.shrimp);
})
