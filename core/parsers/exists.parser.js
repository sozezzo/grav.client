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
}

ExistsParser.prototype.transform = function(){
  if(this.fault){
    throw new Error(this.fault.message);
  }
  const exists = utils.parseFieldValue(this.data.response.value);
  if(exists){
    const emailHash = this.data.response.name._text;
    const avatarUrl = `https://secure.gravatar.com/avatar/${emailHash}`;
    return { emailHash, avatarUrl };
  }
}

module.exports = ExistsParser;