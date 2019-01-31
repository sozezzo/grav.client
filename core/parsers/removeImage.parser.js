const AckParser = require('./ack.parser');

function RemoveImageParser(){
  this.data = null;
}

 Object.assign(RemoveImageParser.prototype, AckParser.prototype) ;

module.exports = RemoveImageParser;