const utils = require('../grav.utils');
const Fault = require('../grav.fault');

function DeleteUserImage(){
  this.data = null;
}

DeleteUserImage.prototype.collect = function(){
  const response = this.data.methodResponse;
  if(response.fault){
    this.fault = new Fault(response.fault);
  } else {
    this.data.response = response.params.param.value;
  }
}

DeleteUserImage.prototype.transform = function(){
  if(this.fault){
    throw new Error(this.fault.message);
  }
  const fieldValue = this.data.response;
  const deleted = utils.parseFieldValue(fieldValue);
  return { deleted };
}

module.exports = DeleteUserImage;