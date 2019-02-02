const api = require('../../core/grav.api');
const nock = require('nock');
const crypto = require('crypto');
const GravXML = require('../../core/grav.xml');
const creds = require('../../creds');
const utils = require('../../core/grav.utils');

let hash;
let xml;
let endpoint;
let response = '<?xml version="1.0"?><methodResponse></methodResponse>';

describe('xml-rpc api client', function(){

  beforeEach(function(){
    hash = crypto.createHash('md5')
    .update(creds.email.trim().toLowerCase())
    .digest("hex");
    xml = new GravXML(creds.email, creds.password);
    endpoint = `${utils.api_origin}/xmlrpc?user=${hash}`;
  })

  it('should have get method', function(){
    expect(api.get).toBeDefined();
  })

  it('should implement grav.exists', function(){

    nock(utils.api_origin)
    .get(`/xmlrpc?user=${hash}`)
    .reply(200, response);
    
    payload = xml.grav_exists(hash);
    
    api.get(endpoint, payload)
       .then(response => {
          const _response = JSON.parse(response);
          expect(typeof response).toBe('string');
          expect(typeof _response).toBe('object');
          expect(_response._declaration).toBeDefined();
          expect(_response.methodResponse).toBeDefined();
        })

  })

  it('should implement grav.test', function(){

    nock(utils.api_origin)
    .get(`/xmlrpc?user=${hash}`)
    .reply(200, response);
    
    payload = xml.grav_test(hash);
    
    api.get(endpoint, payload)
       .then(response => {
          const _response = JSON.parse(response);
          expect(typeof response).toBe('string');
          expect(typeof _response).toBe('object');
          expect(_response._declaration).toBeDefined();
          expect(_response.methodResponse).toBeDefined();
        })

  })

})