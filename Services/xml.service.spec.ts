import { XmlService } from './xml.service';

describe('XmlService', () => {
  let service: XmlService;

  beforeEach(() => {
    service = new XmlService();
  })

  it('should work', () => {
    expect(service.exists).toBeDefined();
    expect(service.test).toBeDefined();
  })
})