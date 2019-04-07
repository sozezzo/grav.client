function ParseContext(parser){
  this.parser = parser;
}

ParseContext.prototype.parse = function(data){
  this.parser.data = data;
  return this.parser.collect().transform();
}

module.exports = ParseContext;