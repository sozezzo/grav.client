const AckParser = require('./ack.parser');

function TestParser(){
  this.data = null;
}

 Object.assign(TestParser.prototype, AckParser.prototype) ;

module.exports = TestParser;