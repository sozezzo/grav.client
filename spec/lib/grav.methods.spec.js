const GravMethods = require('../../lib/grav.methods');
const { GRAV } = require('../../lib/constants');

describe('GravMethods', function(){
  
  const imageName = 'imageName';
  const userEmail = 'user@example.com';
  const userPassword = 'userPassword';
  const hash = 'hash';
  const gravMethods = new GravMethods(userEmail, userPassword);

  test.each([
    [GRAV.EXISTS],
    [GRAV.ADDRESSES],
    [GRAV.USER_IMAGES],
    [GRAV.SAVE_URL],
    [GRAV.USE_USER_IMAGE],
    [GRAV.REMOVE_IMAGE],
    [GRAV.DELETE_USER_IMAGE],
    [GRAV.TEST],
  ])('should include %s', (methodName) => {
    expect(gravMethods[methodName]).toBeDefined();
  })

  describe('grav.exists', () => {
    const method = gravMethods[GRAV.EXISTS];
    const methodCall = method(hash);
    it('should include hash in method call', function(){
      const hashElement = `<value>${hash}</value>`;
      expect(methodCall).toContain(hashElement);
    })
    it('should include password in method call', function(){
      const passwordElement = `<string>${userPassword}</string>`;
      expect(methodCall).toContain(passwordElement);
    })
  })

  describe('grav.addresses', () => {
    const method = gravMethods[GRAV.ADDRESSES];
    const methodCall = method();
    it('should include password in method call', function(){
      const passwordElement = `<string>${userPassword}</string>`;
      expect(methodCall).toContain(passwordElement);
    })
  })

  describe('grav.userImages', () => {
    const method = gravMethods[GRAV.USER_IMAGES];
    const methodCall = method();
    it('should include password in method call', function(){
      const passwordElement = `<string>${userPassword}</string>`;
      expect(methodCall).toContain(passwordElement);
    })
  })

  describe('grav.saveUrl', () => {
    const imageUrl = 'imageUrl';
    const rating = 0;
    const method = gravMethods[GRAV.SAVE_URL];
    const methodCall = method(imageUrl, rating);
    it('should include image url in method call', () => {
      const imageUrlElement = `<string>${imageUrl}</string>`;
      expect(methodCall).toContain(imageUrlElement);
    })
    it('should include rating in method call', () => {
      const ratingElement = `<int>${rating}</int>`;
      expect(methodCall).toContain(ratingElement);
    })
    it('should include password in method call', () => {
      const passwordElement = `<string>${userPassword}</string>`;
      expect(methodCall).toContain(passwordElement);
    })
  })

  describe('grav.useUserImage', () => {
    const method = gravMethods[GRAV.USE_USER_IMAGE];
    const methodCall = method(imageName);
    it('should include image name in method call ', () => {
      const imageNameElement = `<string>${imageName}</string>`
      expect(methodCall).toContain(imageNameElement);
    })
    it('should include user email in method call ', () => {
      const userEmailElement = `<string>${userEmail}</string>`
      expect(methodCall).toContain(userEmailElement);
    })
    it('should include password in method call ', () => {
      const userPasswordElement = `<string>${userPassword}</string>`
      expect(methodCall).toContain(userPasswordElement);
    })
  })

  describe('grav.removeImage', () => {
    const method = gravMethods[GRAV.REMOVE_IMAGE];
    const methodCall = method();
    it('should include user email in method call ', () => {
      const userEmailElement = `<string>${userEmail}</string>`
      expect(methodCall).toContain(userEmailElement);
    })
    it('should include password in method call ', () => {
      const userPasswordElement = `<string>${userPassword}</string>`
      expect(methodCall).toContain(userPasswordElement);
    })
  })

  describe('grav.deleteUserImage', () => {
    const method = gravMethods[GRAV.DELETE_USER_IMAGE];
    const methodCall = method(imageName);
    it('should include image name in method call ', () => {
      const imageNameElement = `<string>${imageName}</string>`
      expect(methodCall).toContain(imageNameElement);
    })
    it('should include password in method call ', () => {
      const userPasswordElement = `<string>${userPassword}</string>`
      expect(methodCall).toContain(userPasswordElement);
    })
  })

  describe('grav.test', () => {
    const method = gravMethods[GRAV.TEST];
    const methodCall = method();
    it('should include password in method call ', () => {
      const userPasswordElement = `<string>${userPassword}</string>`
      expect(methodCall).toContain(userPasswordElement);
    })
  })

})