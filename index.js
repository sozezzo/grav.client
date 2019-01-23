const GravXML = require('./core/grav.xml');
const crypto = require('crypto');
const api = require('./core/grav.api');
const cloudinary = require('cloudinary');
const creds = require('./demo/creds');

cloudinary.config({ 
  cloud_name: creds.cloud_name, 
  api_key: creds.api_key, 
  api_secret: creds.api_secret
});

function Grav(email, password){
  this.xml = new GravXML(email, password);
  this.hash = crypto.createHash('md5')
                    .update(email)
                    .digest("hex");
  this.api_url = `https://secure.gravatar.com/xmlrpc?user=${this.hash}`;
}

Grav.prototype.exists = function(){
  return new Promise((resolve, reject) => {
    const payload = this.xml.grav_exists(this.hash);
    const result = api.get(this.api_url, payload);
    resolve(result);
  })
}

Grav.prototype.addresses = function(){
  return new Promise((resolve, reject) => {
    const payload = this.xml.grav_addresses();
    const result = api.get(this.api_url, payload);
    resolve(result);
  })
}

Grav.prototype.userimages = function(){
  return new Promise((resolve, reject) => {
    const payload = this.xml.grav_userimages();
    const result = api.get(this.api_url, payload);
    resolve(result);
  })
}

Grav.prototype.saveData = function(imageData){
  return new Promise((resolve, reject) => {
    const uploadString = "data:image/png;base64,";
    cloudinary.v2.uploader.upload(uploadString + imageData, { 
        public_id: `avatar_${this.hash}`, 
        tags: ['grav.client']
      }, (error, result) => {
        if(error) reject(error);
        this.saveUrl(result.url).then(data => {
          resolve(data);
        })
    });
  })
}

Grav.prototype.saveData__ = function(imageData){
  return new Promise((resolve, reject) => {
    const payload = this.xml.grav_saveData(imageData);
    const result = api.get(this.api_url, payload);
    resolve(result);
  })
}

Grav.prototype.saveUrl = function(imageUrl){
  return new Promise((resolve, reject) => {
    const payload = this.xml.grav_saveUrl(imageUrl);
    const result = api.get(this.api_url, payload);
    resolve(result);
  })
}

Grav.prototype.useUserimage = function(imageName){
  return new Promise((resolve, reject) => {
    const payload = this.xml.grav_useUserimage(imageName);
    const result = api.get(this.api_url, payload);
    resolve(result);
  })
}

Grav.prototype.test = function(){
  return new Promise((resolve, reject) => {
    const payload = this.xml.grav_test();
    const result = api.get(this.api_url, payload);
    resolve(result);
  })
}

module.exports = {
  login: function(email, pw){
    return new Grav(email, pw)
  }
};