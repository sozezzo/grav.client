const request = require('request');
const convert = require('xml-js');
const api = {};

api.get = function(url, methodCall){
  return new Promise((resolve, reject) => {
    request.get({
      headers: { 'content-type' : 'text/xml' },
      url:     url,
      body:    methodCall
    }, function(error, response, body){
      if(error) reject(error);
      const json = convert.xml2js(body, {
        compact: true,
        spaces: 4 
      });
      resolve(json);
    });
  })
}

api.post = function(avatar){
  return new Promise((resolve, reject) => {
    const save = avatar.mimetype ? this.saveEncodedImage : this.saveImageFile;
    save(avatar, function(error, response, body){
      if(error) reject(error);
      resolve(body);
    });
  })
}

api.saveImageFile = function(avatar, callback){
  request.post({
    headers: { 'content-type' : 'multipart/form-data; charset=UTF-8' },
    url:'https://dailyavatar.io/api/v1/avatars',
    formData: avatar.formData
  }, callback);
}

api.saveEncodedImage = function(avatar, callback){
  request.post({
    headers: { 'content-type' : 'application/json; charset=UTF-8' },
    url:     "https://dailyavatar.io/api/v1/avatars/base64",
    body:    JSON.stringify(avatar)
  }, callback);
}

module.exports = api;
