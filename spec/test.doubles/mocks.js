const nock = require('nock');
const utils = require('../../lib/grav.utils');
const fakes = require('./fakes');
const xmlResponse = '<?xml version="1.0"?><methodResponse></methodResponse>';

const httpServer = function(){
  nock(utils.api_origin, {
    reqheaders: { 'content-type' : 'text/xml' }
  })
  .get(`/xmlrpc?user=user`)
  .reply(200, xmlResponse);
  
  nock('https://dailyavatar.io', {
    reqheaders: { 'content-type' : 'multipart/form-data; charset=UTF-8' }
  })
  .persist()
  .post(`/api/v1/avatars`)
  .reply(200, fakes.imageUrl);
  
  nock('https://dailyavatar.io', {
    reqheaders: { 'content-type' : 'application/json; charset=UTF-8' }
  })
  .persist()
  .post(`/api/v1/avatars/base64`)
  .reply(200, fakes.imageUrl);
};

module.exports = {
  httpServer
};