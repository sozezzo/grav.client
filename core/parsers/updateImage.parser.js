const utils = require('../grav.utils');

function RemoveImageParser(){
  this.data = null;
}

RemoveImageParser.prototype.collect = function(){
  const response = this.data.methodResponse.params.param.value.struct.member;
  this.updated = utils.parseFieldValue(response.value);
}

RemoveImageParser.prototype.transform = function(){
  return { updated: this.updated };
}

module.exports = RemoveImageParser;