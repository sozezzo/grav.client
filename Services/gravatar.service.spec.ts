import { GravatarService } from './gravatar.service';
import { HttpShim } from '../Infrastructure/http-shim';
import { ExistsHttpResponseStub } from '../Common/TestDoubles/http-response-stubs';
import { email, password } from '../Common/TestDoubles/primitive-stubs';

describe('GravatarService', () => {
  
  let service : GravatarService;

  beforeEach(() => {  
    service = new GravatarService(email, password);
  })

  it('should invoke grav.exists', async () => {
    const httpShim = new HttpShim(service.emailHash);
    const responseStub = new ExistsHttpResponseStub(true, service.emailHash);
    spyOn(httpShim, 'rpc').and.returnValue(responseStub.value);
    service.http = httpShim;
    const result = await service.exists();
    expect(result.DidSucceed).toBe(true);
  })

  it('should get user account email addresses', async () => {
    expect(service.addresses).toBeDefined();
  })
  it('should save image file', async () => {
    expect(service.saveImage).toBeDefined();
  })
  it('should save encoded image', async () => {
    expect(service.saveEncodedImage).toBeDefined();
  })
  it('should save image url', async () => {
    expect(service.saveImageUrl).toBeDefined();
  })
  it('should use user image', async () => {
    expect(service.useUserImage).toBeDefined();
  })
  it('should remove user image', async () => {
    expect(service.removeImage).toBeDefined();
  })
  it('should delete user image', async () => {
    expect(service.deleteUserImage).toBeDefined();
  })
  it('should invoke grav.test', async () => {
    expect(service.test).toBeDefined();
  })

})