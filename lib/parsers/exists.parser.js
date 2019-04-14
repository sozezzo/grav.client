const utils = require('../grav.utils');
const Fault = require('../grav.fault');

function ExistsParser(){
  this.data = null;
}

ExistsParser.prototype.collect = function(){
  const response = this.data.methodResponse;
  if(response.fault){
    this.fault = new Fault(response.fault);
  } else {
    this.data.response = response.params.param.value.struct.member;
  }
  return this;
}

ExistsParser.prototype.transform = function(){
  if(this.fault){
    throw new Error(this.fault.message);
  }
  if(!this.data.response.value) return;
  const emailHash = this.data.response.name._text;
  const avatarUrl = `${utils.api_origin}/avatar/${emailHash}`;
  return { emailHash, avatarUrl };
}

module.exports = ExistsParser;