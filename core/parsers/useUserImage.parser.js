const AckParser = require('./ack.parser');

function UseUserImageParser(){
  this.data = null;
}

 Object.assign(UseUserImageParser.prototype, AckParser.prototype) ;

module.exports = UseUserImageParser;