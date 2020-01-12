require("jasmine");
import { GravatarClient } from "../Presentation";
import { config } from "dotenv";
import { join } from "path";
import { readFileSync } from "fs";
import { imageUrl } from "../Common/TestDoubles/primitive-stubs";
import { GetPrimaryImageUseCase } from "../Presentation";

config({ path: "Tests/.env" });

let originalPrimaryImage: string;
const email = process.env.EMAIL as string;
const password = process.env.PASSWORD as string;
const imageNames = { bubba: "", gump: "", shrimp: "" };

describe("GravatarClient", () => {
  let client: GravatarClient;

  beforeAll(async () => {
    client = new GravatarClient(email, password);
    const getPrimaryImageUseCase = new GetPrimaryImageUseCase();
    getPrimaryImageUseCase.client = client;
    originalPrimaryImage = await getPrimaryImageUseCase.execute();
  });

  afterAll(async () => {
    await client.useUserImage(originalPrimaryImage);
    await client.deleteUserImage(imageNames.bubba);
    await client.deleteUserImage(imageNames.gump);
  });

  it("should check if account exists", async () => {
    const result = await client.exists();
    expect(result.DidSucceed).toBe(true);
  });
  it("should get account email addresses", async () => {
    const result = await client.addresses();
    expect(result.DidSucceed).toBe(true);
  });
  it("should get user images", async () => {
    const result = await client.userImages();
    expect(result.DidSucceed).toBe(true);
  });
  it("should upload image file", async () => {
    const imgPath = join(__dirname, "../Common/Assets/bubba.jpg");
    const result = await client.saveImage(imgPath);
    imageNames.bubba = result.Value.imageName;
    expect(result.DidSucceed).toBe(true);
  });
  it("should upload encoded image", async () => {
    const imgPath = join(__dirname, "../Common/Assets/gump.jpg");
    const bitmap = readFileSync(imgPath);
    const imageData = new Buffer(bitmap).toString("base64");
    const result = await client.saveEncodedImage(imageData, "jpeg");
    imageNames.gump = result.Value.imageName;
    expect(result.DidSucceed).toBe(true);
  });
  it("should save image url", async () => {
    const result = await client.saveImageUrl(imageUrl);
    imageNames.shrimp = result.Value.imageName;
    expect(result.DidSucceed).toBe(true);
  });
  it("should remove primary image", async () => {
    const result = await client.removeImage();
    expect(result.DidSucceed).toBe(true);
  });
  it("should update primary image", async () => {
    const result = await client.useUserImage(originalPrimaryImage);
    expect(result.DidSucceed).toBe(true);
  });
  it("should delete image", async () => {
    const result = await client.deleteUserImage(imageNames.shrimp);
    expect(result.DidSucceed).toBe(true);
  });
  it("should do sanity check", async () => {
    const result = await client.test();
    expect(result.DidSucceed).toBe(true);
  });
});
