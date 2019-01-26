function AddressParser(){
  this.data = null;
}

AddressParser.prototype.collect = function(){
  const member = this.data.methodResponse.params.param.value.struct.member;
  this.data = {
    email: member.name._text,
    fields: member.value.struct.member
  };
}

AddressParser.prototype.transform = function(){
  const address = {};
  address.email = this.data.email;
  this.data.fields.forEach(field => {
    const fieldValue = parseFieldValue(field.value);
    address[field.name._text] = fieldValue;
  })
  return address;
}

function parseFieldValue(fieldValue){
  if(fieldValue.int) return Number(fieldValue.int._text);
  if(fieldValue.string) return fieldValue.string._text;
  throw new Error('could not parse field value', fieldValue);
}

module.exports = AddressParser;