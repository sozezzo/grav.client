import { GravatarService } from './gravatar.service';

describe('GravatarService', () => {
  
  let service : GravatarService;

  beforeEach(() => {
    const email = "tony.stark@examle.com";
    const password = "123";    
    service = new GravatarService(email, password);
  })

  it('should work', () => {
    expect(service).toBeDefined();
  })

})