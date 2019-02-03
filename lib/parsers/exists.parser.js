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
  const emailHash = this.data.response.name._text;
  if(exists) {
    const avatarUrl = `${utils.api_origin}/avatar/${emailHash}`;
    return { emailHash, avatarUrl };
  } else {
    throw new Error(`no matching gravatar for email hash "${emailHash}"`);
  }
}

module.exports = ExistsParser;