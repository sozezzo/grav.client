function UserImageParser(){
  this.data = null;
}

UserImageParser.prototype.collect = function(){
  const images = this.data.methodResponse.params.param.value.struct.member;
  this.data = { images };
}

UserImageParser.prototype.transform = function(){
  return this.data.images.map(img => {
    return {
      name: img.name._text,
      url: img.value.array.data.value[1].string._text
    };
  })
}

module.exports = UserImageParser;