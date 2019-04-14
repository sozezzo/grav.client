const nock = require('nock');
const fake = require('../../fake');
const xmlResponse = '<?xml version="1.0"?><methodResponse></methodResponse>';
const utils = require('../../../lib/grav.utils');

const ENDPOINTS = Object.freeze({
  SAVE_IMAGE:'SAVE_IMAGE',
  SAVE_ENCODED_IMAGE:'SAVE_ENCODED_IMAGE',
  GRAVATAR: 'GRAVATAR'
});

function intercept(endpoint) {
  let request;
  switch (endpoint) {
    case ENDPOINTS.GRAVATAR:
      request = nock(utils.api_origin, {
        reqheaders: { 'content-type' : 'text/xml' }
      })
      .get(`/xmlrpc?user=user`);
      if(this.replyWithError){
        request.replyWithError(fake.errorMessage);
      } else {
        request.reply(200, xmlResponse);
      }
      break;
    case ENDPOINTS.SAVE_IMAGE:
      request = nock('https://dailyavatar.io', {
        reqheaders: { 
          'content-type' : 'multipart/form-data; charset=UTF-8' 
        }
      })
      .post(`/api/v1/avatars`);
      if(this.replyWithError){
        request.replyWithError(fake.errorMessage);
      } else {
        request.reply(200, fake.imageUrl);
      }
      break;
    case ENDPOINTS.SAVE_ENCODED_IMAGE:
      request = nock('https://dailyavatar.io', {
        reqheaders: { 'content-type' : 'application/json; charset=UTF-8' }
      })
      .post(`/api/v1/avatars/base64`);
      if(this.replyWithError){
        request.replyWithError(fake.errorMessage);
      } else {
        request.reply(200, fake.imageUrl);
      }
      break;
    default:
      break;
  }
  return ServerMock;
};

const ServerMock = {
  create: () => ({
    replyWithError: false,
    intercept
  })
};

module.exports = {
  ENDPOINTS, ServerMock
}