const request = require('request');
const convert = require('xml-js');
const api = {};

api.get = function(url, payload){
  return new Promise((resolve, reject) => {
    request.get({
      headers: { 'content-type' : 'text/xml' },
      url:     url,
      body:    payload
    }, function(error, response, body){
      if(error) reject(error);
      const json = convert.xml2json(body, { compact: true, spaces: 4 });
      resolve(json);
    });
  })
}

api.post = function(avatar){
  return new Promise((resolve, reject) => {
    request.post({
      headers: { 'content-type' : 'application/json' },
      url:     "https://morning-cymbal.glitch.me/api/v1/avatars",
      body:    JSON.stringify(avatar)
    }, function(error, response, body){
      if(error) reject(error);
      resolve(body);
    });
  })
}

module.exports = api;