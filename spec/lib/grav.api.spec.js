const api = require('../../lib/grav.api');
const utils = require('../../lib/grav.utils');
const fake = require('../fake');
const { ENDPOINTS, ServerMock } = require('server');

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

  it('should return image url after saving encoded image', () => {
    ServerMock.create().intercept(ENDPOINTS.SAVE_ENCODED_IMAGE);
    api.saveEncodedImage({}, (err, response, body) => {
      expect(body).toBe(fake.imageUrl);
    });
  })

  it('should return image url after saving image file', () => {
    ServerMock.create().intercept(ENDPOINTS.SAVE_IMAGE);
    api.saveImageFile({}, (err, response, body) => {
      expect(body).toBe(fake.imageUrl);
    });
  })

  describe('grav.api.get', () => {
    it('should convert text/xml response to json object', () => {
      const xmlPayload = '<methodCall></methodCall>';
      ServerMock.create().intercept(ENDPOINTS.GRAVATAR);
      return api.get(`${utils.api_origin}/xmlrpc?user=user`, xmlPayload)
         .then(response => {
            expect(response.methodResponse).toBeDefined();
          })
    })
    it('should catch error', () => {
      ServerMock.create().intercept(ENDPOINTS.GRAVATAR);
      return expect(api.get(null, null)).rejects.toThrow();
    })
  })

  describe('grav.api.post', () => {
    it('should save encoded image if mimetype is present', (done) => {
      const avatar = { mimetype: 'jpg' };
      const saveEncodedImageSpy = jest.spyOn(api, 'saveEncodedImage');
      ServerMock.create().intercept(ENDPOINTS.SAVE_ENCODED_IMAGE)
      api.post(avatar)
         .then(response => {
           expect(saveEncodedImageSpy).toHaveBeenCalled();
           done();
          })
    })
    it('should save image file if mimetype is not present', (done) => {
      const avatar = { mimetype: undefined };
      const saveImageFileSpy = jest.spyOn(api, 'saveImageFile');
      ServerMock.create().intercept(ENDPOINTS.SAVE_IMAGE);
      api.post(avatar)
         .then(response => {
           expect(saveImageFileSpy).toHaveBeenCalled();
           done();
          })
    })
    it('should catch error on save image', () => {
      const serverMock = ServerMock.create();
      serverMock.replyWithError = true;
      serverMock.intercept(ENDPOINTS.SAVE_IMAGE);
      return expect(api.post({})).rejects.toThrow(fake.errorMessage);
    })
    it('should catch error on save encoded image', () => {
      const serverMock = ServerMock.create();
      serverMock.replyWithError = true;
      serverMock.intercept(ENDPOINTS.SAVE_ENCODED_IMAGE);
      return expect(api.post({ mimetype: true })).rejects.toThrow(fake.errorMessage);
    })
  })
})
