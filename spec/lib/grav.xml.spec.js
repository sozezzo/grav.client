const GravXML = require('../../lib/grav.xml');
const userName = 'userName';
const userPassword = 'userPassword';
const hash = 'hash';
const gravXml = new GravXML(userName, userPassword);

describe('grav.xml', function(){

  test.each([
    ['grav_exists'],
    ['grav_addresses'],
    ['grav_userImages'],
    ['grav_saveUrl'],
    ['grav_useUserImage'],
    ['grav_removeImage'],
    ['grav_deleteUserImage'],
    ['grav_test'],
  ])('should have "%s" method', (methodName) => {
    expect(gravXml[methodName]).toBeDefined();
  })

  describe('grav_exists', () => {
    const getMethodCall = () => (gravXml.grav_exists(hash));
    it('should include hash in methodCall', function(){
      const hashElement = `<value>${hash}</value>`;
      const methodCall = getMethodCall();
      expect(methodCall).toContain(hashElement);
    })
    it('should include password in methodCall', function(){
      const passwordElement = `<string>${userPassword}</string>`;
      const methodCall = getMethodCall();
      expect(methodCall).toContain(passwordElement);
    })
  })

  describe('grav_addresses', () => {
    it('should include password in methodCall', function(){
      const passwordElement = `<string>${userPassword}</string>`;
      const methodCall = gravXml.grav_addresses(hash);
      expect(methodCall).toContain(passwordElement);
    })
  })

  describe('grav_userImages', () => {
    it('should include password in methodCall', function(){
      const passwordElement = `<string>${userPassword}</string>`;
      const methodCall = gravXml.grav_userImages(hash);
      expect(methodCall).toContain(passwordElement);
    })
  })

  describe('grav_saveUrl', () => {
    const imageUrl = 'imageUrl';
    const rating = 0;
    const getMethodCall = () => (gravXml.grav_saveUrl(imageUrl,rating));
    it('should include imageUrl in methodCall', function(){
      const methodCall = getMethodCall();
      const imageUrlElement = `<string>${imageUrl}</string>`;
      expect(methodCall).toContain(imageUrlElement);
    })
    it('should include rating in methodCall', function(){
      const methodCall = getMethodCall();
      const ratingElement = 0;
      expect(methodCall).toContain(ratingElement);
    })
    it('should include password in methodCall', function(){
      const methodCall = getMethodCall();
      const passwordElement = `<string>${userPassword}</string>`;
      expect(methodCall).toContain(passwordElement);
    })
  })

})