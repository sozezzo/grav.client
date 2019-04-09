const nock = require('nock');
const api = require('../../lib/grav.api');
const utils = require('../../lib/grav.utils');
const fake = require('../fake');
const endpoint = `${utils.api_origin}/xmlrpc?user=user`;
const xmlPayload = '<methodCall></methodCall>';
const xmlResponse = '<?xml version="1.0"?><methodResponse></methodResponse>';

describe('grav.api', () => {
  
  beforeAll(mockHttpServer);

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
      expect(body).toBe(fake.imageUrl);
      done();
    });
  })

  it('should return image url after saving image file', (done) => {
    api.saveImageFile({}, (err, response, body) => {
      expect(body).toBe(fake.imageUrl);
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
    
    beforeAll(mockHttpServer);

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

function mockHttpServer() {
  nock(utils.api_origin, {
    reqheaders: { 'content-type' : 'text/xml' }
  })
  .get(`/xmlrpc?user=user`)
  .reply(200, xmlResponse);
  
  nock('https://dailyavatar.io', {
    reqheaders: { 'content-type' : 'multipart/form-data; charset=UTF-8' }
  })
  .post(`/api/v1/avatars`)
  .reply(200, fake.imageUrl);
  
  nock('https://dailyavatar.io', {
    reqheaders: { 'content-type' : 'application/json; charset=UTF-8' }
  })
  .post(`/api/v1/avatars/base64`)
  .reply(200, fake.imageUrl);
};