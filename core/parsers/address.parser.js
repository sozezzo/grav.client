const utils = require('../grav.utils');
const Fault = require('../grav.fault');

function AddressParser(){
  this.data = null;
}

AddressParser.prototype.collect = function(){
  const response = this.data.methodResponse;
  if(response.fault){
    this.fault = new Fault(response.fault);
  } else {
    const member = response.params.param.value.struct.member;
    this.data = {
      email: member.name._text,
      fields: member.value.struct.member
    };
  }
}

AddressParser.prototype.transform = function(){
  if(this.fault){
    throw new Error(this.fault.message);
  }
  const address = {};
  address.email = this.data.email;
  this.data.fields.forEach(field => {
    const fieldValue = utils.parseFieldValue(field.value);
    address[field.name._text] = fieldValue;
  })
  address.rating = utils.rating[address.rating];
  return address;
}

module.exports = AddressParser;