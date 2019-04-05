const GravXML = require('./grav.xml');
const crypto = require('crypto');
const api = require('./grav.api');
const utils = require('./grav.utils');
const fs = require('fs');
const Parsers = require('../lib/parsers');

function Grav(email, password){
  email = `${email}`.trim().toLowerCase();
  this.xml = new GravXML(email, password);
  this.hash = crypto.createHash('md5')
                    .update(email)
                    .digest("hex");
  this.api_url = `${utils.api_origin}/xmlrpc?user=${this.hash}`;
  this.autoParse = false;
}

Grav.prototype.exists = function(){
  return new Promise((resolve, reject) => {
    const methodCall = this.xml.grav_exists(this.hash);
    api.get(this.api_url, methodCall)
    .then(response => {
      if(this.autoParse){
        const context = getParseContext(Parsers.ExistsParser);
        resolve(context.parse(response));
      } else {
        resolve(response);
      }
    }).catch(reject);
  })
}

Grav.prototype.addresses = function(){
  return new Promise((resolve, reject) => {
    const methodCall = this.xml.grav_addresses();
    api.get(this.api_url, methodCall)
    .then(response => {
      if(this.autoParse){
        const context = getParseContext(Parsers.AddressParser);
        resolve(context.parse(response));
      } else {
        resolve(response);
      }
    }).catch(reject);
  })
}

Grav.prototype.userImages = function(){
  return new Promise((resolve, reject) => {
    const methodCall = this.xml.grav_userImages();
    api.get(this.api_url, methodCall)
    .then(response => {
      if(this.autoParse){
        const context = getParseContext(Parsers.UserImagesParser);
        resolve(context.parse(response));
      } else {
        resolve(response);
      }
    }).catch(reject);
  })
}

Grav.prototype.saveImage = function(image, rating = 0){
  return new Promise((resolve, reject) => {
    const avatar = {
      formData: {
        avatar: fs.createReadStream(image)
      }
    };
    api.post(avatar).then(imageUrl => {
      this.saveUrl(imageUrl, rating).then(response => {
        resolve(response);
      }).catch(reject);
    }).catch(reject);
  })
}

Grav.prototype.saveEncodedImage = function(base64string, mimetype, rating = 0){
  return new Promise((resolve, reject) => {
    const avatar = {
      id: this.hash,
      data: base64string, 
      mimetype
    }
    api.post(avatar).then(imageUrl => {
      this.saveUrl(imageUrl, rating).then(response => {
        resolve(response);
      }).catch(reject);
    }).catch(reject);
  })
}

Grav.prototype.saveUrl = function(imageUrl, rating = 0){
  return new Promise((resolve, reject) => {
    const methodCall = this.xml.grav_saveUrl(imageUrl, rating);
    api.get(this.api_url, methodCall)
    .then(response => {
      if(this.autoParse){
        const context = getParseContext(Parsers.SaveUrlParser);
        resolve(context.parse(response));
      } else {
        resolve(response);
      }
    }).catch(reject);
  })
}

Grav.prototype.useUserImage = function(imageName){
  return new Promise((resolve, reject) => {
    const methodCall = this.xml.grav_useUserImage(imageName);
    api.get(this.api_url, methodCall)
    .then(response => {
      if(this.autoParse){
        const context = getParseContext(Parsers.UseUserImageParser);
        resolve(context.parse(response));
      } else {
        resolve(response);
      }
    }).catch(reject);
  })
}

Grav.prototype.removeImage = function(){
  return new Promise((resolve, reject) => {
    const methodCall = this.xml.grav_removeImage();
    api.get(this.api_url, methodCall)
    .then(response => {
      if(this.autoParse){
        const context = getParseContext(Parsers.RemoveImageParser);
        resolve(context.parse(response));
      } else {
        resolve(response);
      }
    }).catch(reject);
  })
}

Grav.prototype.deleteUserImage = function(imageName){
  return new Promise((resolve, reject) => {
    const methodCall = this.xml.grav_deleteUserImage(imageName);
    api.get(this.api_url, methodCall)
    .then(response => {
      if(this.autoParse){
        const context = getParseContext(Parsers.DeleteUserImageParser);
        resolve(context.parse(response));
      } else {
        resolve(response);
      }
    }).catch(reject);
  })
}

Grav.prototype.test = function(){
  return new Promise((resolve, reject) => {
    const methodCall = this.xml.grav_test();
    api.get(this.api_url, methodCall)
    .then(response => {
      if(this.autoParse){
        const context = getParseContext(Parsers.TestParser);
        resolve(context.parse(response));
      } else {
        resolve(response);
      }
    }).catch(reject);
  })
}

Grav.login = function(email, password){
  return new Grav(email, password);
}

function getParseContext(Parser){
  return new Parsers.ParseContext(new Parser());
}

module.exports = Grav;