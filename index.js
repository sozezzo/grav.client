const GravXML = require('./core/grav.xml');
const crypto = require('crypto');
const api = require('./core/grav.api');
const utils = require('./core/grav.utils');

function Grav(email, password){
  this.xml = new GravXML(email, password);
  this.hash = crypto.createHash('md5')
                    .update(email)
                    .digest("hex");
  this.api_url = `${utils.api_origin}/xmlrpc?x=5&user=${this.hash}`;
}

Grav.prototype.exists = function(){
  return new Promise(resolve => {
    const payload = this.xml.grav_exists(this.hash);
    const result = api.get(this.api_url, payload);
    resolve(result);
  })
}

Grav.prototype.addresses = function(){
  return new Promise(resolve => {
    const payload = this.xml.grav_addresses();
    const result = api.get(this.api_url, payload);
    resolve(result);
  })
}

Grav.prototype.userimages = function(){
  return new Promise(resolve => {
    const payload = this.xml.grav_userimages();
    const result = api.get(this.api_url, payload);
    resolve(result);
  })
}

Grav.prototype.saveData = function(imageData, ext){
  return new Promise(resolve => {
    const avatar = {
      id: this.hash,
      data: imageData, 
      ext
    };
    api.post(avatar).then(imageUrl => {
        this.saveUrl(imageUrl).then(data => {
          resolve(data);
        })
      })
      .catch(reject)
  })
}

// api endpoint broken
Grav.prototype.saveData__ = function(imageData){
  return new Promise(resolve => {
    const payload = this.xml.grav_saveData(imageData);
    const result = api.get(this.api_url, payload);
    resolve(result);
  })
}

Grav.prototype.saveUrl = function(imageUrl){
  return new Promise(resolve => {
    const payload = this.xml.grav_saveUrl(imageUrl);
    const result = api.get(this.api_url, payload);
    resolve(result);
  })
}

Grav.prototype.useUserimage = function(imageName){
  return new Promise(resolve => {
    const payload = this.xml.grav_useUserimage(imageName);
    const result = api.get(this.api_url, payload);
    resolve(result);
  })
}

Grav.prototype.removeImage = function(){
  return new Promise(resolve => {
    const payload = this.xml.grav_removeImage();
    const result = api.get(this.api_url, payload);
    resolve(result);
  })
}

Grav.prototype.deleteUserimage = function(imageName){
  return new Promise(resolve => {
    const payload = this.xml.grav_deleteUserimage(imageName);
    const result = api.get(this.api_url, payload);
    resolve(result);
  })
}

Grav.prototype.test = function(){
  return new Promise(resolve => {
    const payload = this.xml.grav_test();
    const result = api.get(this.api_url, payload);
    resolve(result);
  })
}

module.exports = {
  login: function(email, password){
    return new Grav(email, password)
  }
};