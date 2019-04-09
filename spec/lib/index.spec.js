const Grav = require('../../lib/index');
const fake = require('../fake');

jest.mock('fs');
jest.mock('../../lib/grav.api');

const getGrav = () => {
  return new Grav(fake.userEmail, fake.userPassword);;
}

describe('Grav', () => {
  
  describe('Grav.saveImage', () => {
    const grav = getGrav();
    it('should return image url', () => {
      return grav.saveImage(fake.imageUrl, 0).then(response => {
        expect(response.imageName).toBe(fake.imageName);
      })
    });
  })

  describe('Grav.saveEncodedImage', () => {
    const grav = getGrav();
    it('should return image url', () => {
      return grav.saveEncodedImage(fake.imageData,'png',0).then(response => {
        expect(response.imageName).toBe(fake.imageName);
      })
    });
  })

})