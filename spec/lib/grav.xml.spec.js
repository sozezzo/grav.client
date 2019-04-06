const GravXML = require('../../lib/grav.xml');
const imageName = 'imageName';
const userEmail = 'user@example.com';
const userPassword = 'userPassword';
const hash = 'hash';
const gravXml = new GravXML(userEmail, userPassword);

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
    it('should include hash in method call', function(){
      const hashElement = `<value>${hash}</value>`;
      const methodCall = getMethodCall();
      expect(methodCall).toContain(hashElement);
    })
    it('should include password in method call', function(){
      const passwordElement = `<string>${userPassword}</string>`;
      const methodCall = getMethodCall();
      expect(methodCall).toContain(passwordElement);
    })
  })

  describe('grav_addresses', () => {
    it('should include password in method call', function(){
      const passwordElement = `<string>${userPassword}</string>`;
      const methodCall = gravXml.grav_addresses(hash);
      expect(methodCall).toContain(passwordElement);
    })
  })

  describe('grav_userImages', () => {
    it('should include password in method call', function(){
      const passwordElement = `<string>${userPassword}</string>`;
      const methodCall = gravXml.grav_userImages(hash);
      expect(methodCall).toContain(passwordElement);
    })
  })

  describe('grav_saveUrl', () => {
    const imageUrl = 'imageUrl';
    const rating = 0;
    const getMethodCall = () => (gravXml.grav_saveUrl(imageUrl,rating));
    it('should include image url in method call', function(){
      const methodCall = getMethodCall();
      const imageUrlElement = `<string>${imageUrl}</string>`;
      expect(methodCall).toContain(imageUrlElement);
    })
    it('should include rating in method call', function(){
      const methodCall = getMethodCall();
      const ratingElement = 0;
      expect(methodCall).toContain(ratingElement);
    })
    it('should include password in method call', function(){
      const methodCall = getMethodCall();
      const passwordElement = `<string>${userPassword}</string>`;
      expect(methodCall).toContain(passwordElement);
    })
  })

  describe('grav_useUserImage', () => {
    const getMethodCall = () => (gravXml.grav_useUserImage(imageName));
    it('should include image name in method call ', () => {
      const methodCall = getMethodCall();
      const imageNameElement = `<string>${imageName}</string>`
      expect(methodCall).toContain(imageNameElement);
    })
    it('should include user email in method call ', () => {
      const methodCall = getMethodCall();
      const userEmailElement = `<string>${userEmail}</string>`
      expect(methodCall).toContain(userEmailElement);
    })
    it('should include password in method call ', () => {
      const methodCall = getMethodCall();
      const userPasswordElement = `<string>${userPassword}</string>`
      expect(methodCall).toContain(userPasswordElement);
    })
  })

  describe('grav_removeImage', () => {
    const getMethodCall = () => (gravXml.grav_removeImage());
    it('should include user email in method call ', () => {
      const methodCall = getMethodCall();
      const userEmailElement = `<string>${userEmail}</string>`
      expect(methodCall).toContain(userEmailElement);
    })
    it('should include password in method call ', () => {
      const methodCall = getMethodCall();
      const userPasswordElement = `<string>${userPassword}</string>`
      expect(methodCall).toContain(userPasswordElement);
    })
  })

  describe('grav_deleteUserImage', () => {
    const getMethodCall = () => (gravXml.grav_deleteUserImage(imageName));
    it('should include image name in method call ', () => {
      const methodCall = getMethodCall();
      const imageNameElement = `<string>${imageName}</string>`
      expect(methodCall).toContain(imageNameElement);
    })
    it('should include password in method call ', () => {
      const methodCall = getMethodCall();
      const userPasswordElement = `<string>${userPassword}</string>`
      expect(methodCall).toContain(userPasswordElement);
    })
  })

  describe('grav_test', () => {
    const getMethodCall = () => (gravXml.grav_test());
    it('should include password in method call ', () => {
      const methodCall = getMethodCall();
      const userPasswordElement = `<string>${userPassword}</string>`
      expect(methodCall).toContain(userPasswordElement);
    })
  })

})