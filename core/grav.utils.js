const utils = {};

utils.api_origin = "https://secure.gravatar.com";
//utils.api_origin = "https://gravatar.com";

utils.rating = {
  0: 'g',
  1: 'pg',
  2: 'r',
  3: 'x'
};

utils.parseFieldValue = function(fieldValue){
  if(fieldValue.boolean) return (Number(fieldValue.boolean._text) === 1);
  if(fieldValue.int) return Number(fieldValue.int._text);
  if(fieldValue.string) return fieldValue.string._text;
  return null;
};

module.exports = utils;