import { GravatarClient } from '../Presentation';
import { config } from 'dotenv';
import path from 'path';

config({ path: 'Tests/.env' });

const email = process.env.EMAIL as string;
const password = process.env.PASSWORD as string;

describe('GravatarClient', () => {
  let client: GravatarClient;

  beforeEach(() => {
    client = new GravatarClient(email, password);
  })
  
  it(`should invoke grav.exists`, async () => {
    const result = await client.exists();
    expect(result.DidSucceed).toBe(true);
  })

  it(`should get account email addresses`, async () => {
    const result = await client.addresses();
    expect(result.DidSucceed).toBe(true);
  })

  it(`should get user images`, async () => {
    const result = await client.userImages();
    expect(result.DidSucceed).toBe(true);
  })

  it(`should upload image file`, async () => {
    const imgPath = path.join(__dirname, '../Common/Assets/gump.jpg');
    const result = await client.saveImage(imgPath);
    expect(result.DidSucceed).toBe(true);
  })

  it(`should invoke grav.test`, async () => {
    const result = await client.test();
    expect(result.DidSucceed).toBe(true);
  })
})