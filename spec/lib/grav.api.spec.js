const mock = require('../test.doubles/mocks');
const api = require('../../lib/grav.api');
const utils = require('../../lib/grav.utils');
const fakes = require('../test.doubles/fakes');
const endpoint = `${utils.api_origin}/xmlrpc?user=user`;
const xmlPayload = '<methodCall></methodCall>';

mock.httpServer();

describe('grav.api', () => {

  it('should have get method', () => {
    expect(api.get).toBeDefined();
  })

  it('should have post method', () => {
    expect(api.post).toBeDefined();
  })

  it('should have saveEncodedImage method', () => {
    expect(api.saveEncodedImage).toBeDefined();
  })

  it('should have saveImageFile method', () => {
    expect(api.saveImageFile).toBeDefined();
  })

  it('should return image url after saving encoded image', (done) => {
    api.saveEncodedImage({}, (err, response, body) => {
      expect(body).toBe(fakes.imageUrl);
      done();
    });
  })

  it('should return image url after saving image file', (done) => {
    api.saveImageFile({}, (err, response, body) => {
      expect(body).toBe(fakes.imageUrl);
      done();
    });
  })

  describe('grav.api.get', () => {
    it('should convert text/xml response to json object', () => {
      api.get(endpoint, xmlPayload)
         .then(response => {
            expect(typeof response).toBe('object');
          })
    })
  })

  describe('grav.api.post', () => {
    it('should save encoded image if mimetype is present', (done) => {
      const avatar = { mimetype: 'jpg' };
      const saveEncodedImageSpy = jest.spyOn(api, 'saveEncodedImage');
      api.post(avatar)
         .then(response => {
           expect(saveEncodedImageSpy).toHaveBeenCalled();
           done();
          })
    })
    it('should save image file if mimetype is not present', (done) => {
      const avatar = { mimetype: undefined };
      const saveImageFileSpy = jest.spyOn(api, 'saveImageFile');
      api.post(avatar)
         .then(response => {
           expect(saveImageFileSpy).toHaveBeenCalled();
           done();
          })
    })
  })

})