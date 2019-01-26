const utils = require('../grav.utils');

function SaveUrlParser(){
  this.data = null;
}

SaveUrlParser.prototype.collect = function(){
  this.data.response = this.data.methodResponse.params.param.value;
}

SaveUrlParser.prototype.transform = function(){
  const fieldValue = this.data.response;
  const imageName = utils.parseFieldValue(fieldValue);
  return { imageName };
}

module.exports = SaveUrlParser;