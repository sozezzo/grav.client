function ParseContext(parser){
  this.parser = parser;
}

ParseContext.prototype.parse = function(data){
  this.parser.data = JSON.parse(data);
  this.parser.collect();
  return this.parser.transform();
}

module.exports = ParseContext;