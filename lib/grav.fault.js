const utils = require('./grav.utils');

function Fault(fault){
  fault.value.struct.member.forEach(member => {
    const name = member.name._text;
    const value = utils.parseFieldValue(member.value);
    this[name] = value;
  })
  this.message = `faultCode ${this.faultCode}: ${this.faultString}`;
}

module.exports = Fault;