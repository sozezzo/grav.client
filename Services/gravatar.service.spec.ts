import { GravatarService } from './gravatar.service';
import { XmlService } from './xml.service';

describe('GravatarService', () => {
  
  let service : GravatarService;

  beforeEach(() => {
    const email = "tony.stark@examle.com";
    const password = "123";    
    service = new GravatarService(email, password);
    service.xml = new XmlService();
  })

  it('should work', () => {
    expect(service).toBeDefined();
  })

})