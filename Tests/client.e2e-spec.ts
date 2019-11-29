import { GravatarClient } from '../Presentation';
import { config } from 'dotenv';
import { join } from 'path';
import { readFileSync } from 'fs';

config({ path: 'Tests/.env' });

const imgPath = join(__dirname, '../Common/Assets/gump.jpg');
const email = process.env.EMAIL as string;
const password = process.env.PASSWORD as string;
const uploadedImageNames: Array<string> = [];
const originalPrimaryImage: string = "4ddf23534256fb555cfbf10acd7728b2";

describe('GravatarClient', () => {

  let client: GravatarClient;

  beforeEach(() => {
    client = new GravatarClient(email, password);
  })

  it('should invoke grav.exists', async () => {
    const result = await client.exists();
    expect(result.DidSucceed).toBe(true);
  })
  it('should get account email addresses', async () => {
    const result = await client.addresses();
    expect(result.DidSucceed).toBe(true);
  })
  it('should get user images', async () => {
    const result = await client.userImages();
    expect(result.DidSucceed).toBe(true);
  })
  it('should upload image file', async () => {
    const result = await client.saveImage(imgPath);
    uploadedImageNames.push(result.Value.imageName);
    expect(result.DidSucceed).toBe(true);
  })
  it('should upload encoded image', async () => {
    const bitmap = readFileSync(imgPath);
    const imageData = new Buffer(bitmap).toString('base64');
    const result = await client.saveEncodedImage(imageData, 'jpeg');
    uploadedImageNames.push(result.Value.imageName);
    expect(result.DidSucceed).toBe(true);
  })
  it('should save image url', async () => {
    const result = await client.saveImageUrl("https://via.placeholder.com/150");
    uploadedImageNames.push(result.Value.imageName);
    expect(result.DidSucceed).toBe(true);
  })
  it('should remove primary image', async () => {
    const result = await client.removeImage();
    expect(result.DidSucceed).toBe(true);
  })
  it('should update primary image', async () => {
    const result = await client.useUserImage(originalPrimaryImage);
    expect(result.DidSucceed).toBe(true);
  })
  it('should delete image', async () => {
    const result = await client.deleteUserImage(uploadedImageNames[0]);
    expect(result.DidSucceed).toBe(true);
  })
  it('should invoke grav.test', async () => {
    const result = await client.test();
    expect(result.DidSucceed).toBe(true);
  })
})
