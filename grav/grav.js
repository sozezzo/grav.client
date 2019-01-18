const request = require('request');
const convert = require('xml-js');
const grav = {};

grav.exec = function(url, payload){

  return new Promise((resolve, reject) => {
    request.get({
      headers: { 'content-type' : 'text/xml' },
      url:     url,
      body:    payload
    }, function(error, response, body){
      if(error) return reject(error);
      const json = convert.xml2json(body, {compact: true, spaces: 4});
      return resolve(json);
    });
  })
}

module.exports = grav;