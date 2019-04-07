const utils = require('../grav.utils');
const Fault = require('../grav.fault');

function SaveUrlParser(){
  this.data = null;
}

SaveUrlParser.prototype.collect = function(){
  const response = this.data.methodResponse;
  if(response.fault){
    this.fault = new Fault(response.fault);
  } else {
    this.data.response = response.params.param.value;
  }
  return this;
}

SaveUrlParser.prototype.transform = function(){
  if(this.fault){
    throw new Error(this.fault.message);
  }
  const fieldValue = this.data.response;
  const imageName = utils.parseFieldValue(fieldValue);
  return { imageName };
}

module.exports = SaveUrlParser;