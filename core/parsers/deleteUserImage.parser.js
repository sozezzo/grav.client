const utils = require('../grav.utils');

function DeleteUserImage(){
  this.data = null;
}

DeleteUserImage.prototype.collect = function(){
  this.data.response = this.data.methodResponse.params.param.value;
}

DeleteUserImage.prototype.transform = function(){
  const fieldValue = this.data.response;
  const deleted = utils.parseFieldValue(fieldValue);
  return { deleted };
}

module.exports = DeleteUserImage;