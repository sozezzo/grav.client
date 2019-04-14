function ParseContext(){
  const parsers = Array.prototype.slice.call(arguments);
  if(parsers.length == 1) this.parser = parsers[0];
  if(parsers.length > 1) this.parsers = parsers;
}

ParseContext.prototype.parse = function(data) {
  if(this.parser) {
    return _parse.call(this.parser);
  } else if(this.parsers) {
    const parser = this.parsers.shift();
    return _parse.call(parser);
  }
  function _parse(){
    this.data = data;
    return this.collect().transform();
  }
}

module.exports = ParseContext;