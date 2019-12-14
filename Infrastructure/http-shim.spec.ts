import { HttpShim } from './http-shim';
import { emailHash } from '../Common/TestDoubles/Stubs/primitive-stubs';
import { join } from 'path';
import { readFileSync } from 'fs';
import { mockHttpRequests } from '../Common/TestDoubles/mock-factory';

mockHttpRequests();

describe('HttpShim', () => {
  
  let http : HttpShim;

  beforeAll(() => {
    http = new HttpShim(emailHash);
  })

  it('should have endpoint', () => {
    expect(http.endpoint).toBeDefined();
  })
  it('should make rpc call', async () => {  
    const response = await http.rpc("");
    expect(response.status).toBe(200);
  })
  it('should post image file', async () => {
    const imageFilePath = join(__dirname, "../Common/Assets/bubba.jpg");
    const response = await http.postImageFile(imageFilePath);
    expect(response.status).toBe(200);
  })
  it('should post encoded image', async () => {
    const imgPath = join(__dirname, '../Common/Assets/gump.jpg');
    const bitmap = readFileSync(imgPath);
    const imageData = new Buffer(bitmap).toString('base64');
    const response = await http.postEncodedImage(imageData, "jpeg");
    expect(response.status).toBe(200);
  })
})