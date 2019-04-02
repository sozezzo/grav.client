function ParseContext(parser){
  this.parser = parser;
}

ParseContext.prototype.parse = function(data){
  this.parser.data = data;
  this.parser.collect();
  return this.parser.transform();
}

module.exports = ParseContext;