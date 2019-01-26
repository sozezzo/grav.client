const utils = {};

utils.parseFieldValue = function(fieldValue){
  if(fieldValue.boolean) return (Number(fieldValue.boolean._text) === 1);
  if(fieldValue.int) return Number(fieldValue.int._text);
  if(fieldValue.string) return fieldValue.string._text;
  return null;
}

module.exports = utils;