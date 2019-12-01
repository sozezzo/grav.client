import { GravatarService } from './gravatar.service';
import { HttpShim } from '../Infrastructure/http-shim';

import { 
  ResponseStub, ExistsHttpResponseStub, AddressesHttpResponseStub,
  UserImagesHttpResponseStub, SaveImageHttpResponseStub, 
  SaveEncodedImageHttpResponseStub, SaveImageUrlHttpResponseStub
} from '../Common/TestDoubles/http-response-stubs';

import { email, emailHash, password, imageUrl } from '../Common/TestDoubles/primitive-stubs';
import { join } from 'path';
import { readFileSync } from 'fs';

describe('GravatarService', () => {
  
  let service : GravatarService;

  function mockHttpShim(responseStub: ResponseStub) : HttpShim {
    const httpShim = new HttpShim(service.emailHash);
    spyOn(httpShim, 'rpc').and.returnValue(responseStub.value);
    return httpShim;
  };

  beforeAll(() => {
    service = new GravatarService(email, password);
  })

  it('should check if account exists', async () => {
    const responseStub = new ExistsHttpResponseStub(true, service.emailHash);
    const httpShim = mockHttpShim(responseStub);
    service.http = httpShim;
    const result = await service.exists();
    expect(result.DidSucceed).toBe(true);
  })
  it('should have gravatar image url', () => {
    service.http = new HttpShim(service.emailHash);
    const rgx = new RegExp("^https://www.gravatar.com/avatar/(.*)$");
    expect(rgx.test(service.gravatarImageUrl)).toBeTrue();
  })
  it('should get user account email addresses', async () => {
    const responseStub = new AddressesHttpResponseStub(true, service.emailHash);
    const httpShim = mockHttpShim(responseStub);
    service.http = httpShim;
    const result = await service.addresses();
    expect(result.DidSucceed).toBeTrue();
  })
  it('should get user images', async () => {
    const responseStub = new UserImagesHttpResponseStub(true, service.emailHash);
    const httpShim = mockHttpShim(responseStub);
    service.http = httpShim;
    const result = await service.userImages();
    expect(result.DidSucceed).toBeTrue();
  })
  it('should save image file', async () => {
    const responseStub = new SaveImageHttpResponseStub(true);
    const httpShim = mockHttpShim(responseStub);
    const imageFilePath = join(__dirname, "../Common/Assets/bubba.jpg");
    service.http = httpShim;
    const result = await service.saveImage(imageFilePath);
    expect(result.DidSucceed).toBeTrue();
  })
  it('should save encoded image', async () => {
    const responseStub = new SaveEncodedImageHttpResponseStub(true);
    const httpShim = mockHttpShim(responseStub);
    const imgPath = join(__dirname, '../Common/Assets/gump.jpg');
    const bitmap = readFileSync(imgPath);
    const imageData = new Buffer(bitmap).toString('base64');
    service.http = httpShim;
    const result = await service.saveEncodedImage(imageData, 'jpeg');
    expect(result.DidSucceed).toBeTrue();
  })
  it('should save image url', async () => {
    const responseStub = new SaveImageUrlHttpResponseStub(true);
    const httpShim = mockHttpShim(responseStub);
    service.http = httpShim;
    const result = await service.saveImageUrl(imageUrl);
    expect(result.DidSucceed).toBeTrue();
  })
  it('should use user image', async () => {
    // UseUserImageHttpResponseStub
    expect(service.useUserImage).toBeDefined();
  })
  it('should remove image', async () => {
    // RemoveImageHttpResponseStub
    expect(service.removeImage).toBeDefined();
  })
  it('should delete user image', async () => {
    // DeleteUserImageHttpResponseStub
    expect(service.deleteUserImage).toBeDefined();
  })
  it('should invoke grav.test', async () => {
    // TestHttpResponseStub
    expect(service.test).toBeDefined();
  })

})