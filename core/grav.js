const GravXML = require('./grav.xml');
const crypto = require('crypto');
const api = require('./grav.api');
const utils = require('./grav.utils');
const fs = require('fs');

function Grav(email, password){
  email = `${email}`.trim().toLowerCase();
  this.xml = new GravXML(email, password);
  this.hash = crypto.createHash('md5')
                    .update(email)
                    .digest("hex");
  this.api_url = `${utils.api_origin}/xmlrpc?user=${this.hash}`;
}

Grav.prototype.exists = function(){
  return new Promise((resolve, reject) => {
    const payload = this.xml.grav_exists(this.hash);
    api.get(this.api_url, payload)
    .then(response => {
      resolve(response);
    }).catch(reject);
  })
}

Grav.prototype.addresses = function(){
  return new Promise((resolve, reject) => {
    const payload = this.xml.grav_addresses();
    api.get(this.api_url, payload)
    .then(response => {
      resolve(response);
    }).catch(reject);
  })
}

Grav.prototype.userimages = function(){
  return new Promise((resolve, reject) => {
    const payload = this.xml.grav_userimages();
    api.get(this.api_url, payload)
    .then(response => {
      resolve(response);
    }).catch(reject);
  })
}

Grav.prototype.saveData = function(image, ext, rating = 0){
  return new Promise((resolve, reject) => {
    const avatar = ext ? {
      id: this.hash,
      data: image, 
      ext
    } : {
      formData: {
        avatar:  fs.createReadStream(image)
      }
    };
    api.post(avatar).then(imageUrl => {
      this.saveUrl(imageUrl, rating).then(data => {
        resolve(data);
      }).catch(reject);
    }).catch(reject);
  })
}

// api endpoint broken
Grav.prototype.saveData__ = function(imageData){
  return new Promise((resolve, reject) => {
    const payload = this.xml.grav_saveData(imageData, rating);
    api.get(this.api_url, payload)
    .then(response => {
      resolve(response);
    }).catch(reject);
  })
}

Grav.prototype.saveUrl = function(imageUrl, rating = 0){
  return new Promise((resolve, reject) => {
    const payload = this.xml.grav_saveUrl(imageUrl, rating);
    api.get(this.api_url, payload)
    .then(response => {
      resolve(response);
    }).catch(reject);
  })
}

Grav.prototype.useUserimage = function(imageName){
  return new Promise((resolve, reject) => {
    const payload = this.xml.grav_useUserimage(imageName);
    api.get(this.api_url, payload)
    .then(response => {
      resolve(response);
    }).catch(reject);
  })
}

Grav.prototype.removeImage = function(){
  return new Promise((resolve, reject) => {
    const payload = this.xml.grav_removeImage();
    api.get(this.api_url, payload)
    .then(response => {
      resolve(response);
    }).catch(reject);
  })
}

Grav.prototype.deleteUserimage = function(imageName){
  return new Promise((resolve, reject) => {
    const payload = this.xml.grav_deleteUserimage(imageName);
    api.get(this.api_url, payload)
    .then(response => {
      resolve(response);
    }).catch(reject);
  })
}

Grav.prototype.test = function(){
  return new Promise((resolve, reject) => {
    const payload = this.xml.grav_test();
    api.get(this.api_url, payload)
    .then(response => {
      resolve(response);
    }).catch(reject);
  })
}

Grav.login = function(email, password){
  return new Grav(email, password);
}

module.exports = Grav;