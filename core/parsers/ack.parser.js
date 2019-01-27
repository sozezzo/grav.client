const utils = require('../grav.utils');
const Fault = require('../grav.fault');

function AckParser(){
  this.data = null;
}

AckParser.prototype.collect = function(){
  const response = this.data.methodResponse;
  if(response.fault){
    this.fault = new Fault(response.fault);
  } else {
    const member = response.params.param.value.struct.member;
    this.response = utils.parseFieldValue(member.value);
  }
}

AckParser.prototype.transform = function(){
  if(this.fault){
    throw new Error(this.fault.message);
  }
  return { response: this.response };
}

module.exports = AckParser;