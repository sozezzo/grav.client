const Grav = require('../index');
const creds = require('../creds');
const AckParser = require('../core/parsers/ack.parser');
const ParseContext = require('../core/parsers/_parse.context');

const ackParser = new AckParser();
const context = new ParseContext(ackParser);
const grav = Grav.login(creds.email, creds.password);

grav.test().then(data => {
  const response = context.parse(data);
  console.log(response);
}).catch(err => console.log(err));