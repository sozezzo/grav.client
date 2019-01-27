const Fault = require('../grav.fault');

function UserImageParser(){
  this.data = null;
}

UserImageParser.prototype.collect = function(){
  const response = this.data.methodResponse;
  if(response.fault){
    this.fault = new Fault(response.fault);
  } else {
    const images = response.params.param.value.struct.member;
    this.data = { images };
  }
}

UserImageParser.prototype.transform = function(){
  if(this.fault){
    throw new Error(this.fault.message);
  }
  return this.data.images.map(img => {
    return {
      name: img.name._text,
      url: img.value.array.data.value[1].string._text
    };
  })
}

module.exports = UserImageParser;