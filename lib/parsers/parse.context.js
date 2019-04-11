function ParseContext(){
  this.parsers = Array.prototype.slice.call(arguments);
}

ParseContext.prototype.parse = function(data) {
  if(this.parsers.length) {
    const parser = this.parsers.shift();
    parser.data = data;
    return parser.collect().transform();
  }
}

module.exports = ParseContext;