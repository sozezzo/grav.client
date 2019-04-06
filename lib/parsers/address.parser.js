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
    const getData = _member => ({
      email: _member.name._text,
      fields: _member.value.struct.member    
    });
    this.data = Array.isArray(member) ? 
                member.map(getData) : 
                getData(member);
    return this;
  }
}

AddressParser.prototype.transform = function(){
  if(this.fault){
    throw new Error(this.fault.message);
  }
  const getAddress = data => {
    const address = {};
    address.email = data.email;
    data.fields.forEach(field => {
      const fieldValue = utils.parseFieldValue(field.value);
      address[field.name._text] = fieldValue;
    })
    address.rating = utils.rating[address.rating];
    return address;
  };
  return Array.isArray(this.data) ? 
         this.data.map(getAddress) :
         getAddress(this.data);
  
}

module.exports = AddressParser;