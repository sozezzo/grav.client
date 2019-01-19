module.exports = {
  parse: function (_json){
    const data = JSON.parse(_json);
    const images = data.methodResponse.params.param.value.struct.member;
    const _images =
    images.map(img => {
      return {
        name: img.name._text,
        url: img.value.array.data.value[1].string._text
      };
    })
    return _images;
  }
}