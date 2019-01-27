const creds = require('../creds');
const { 
  Grav, AckParser, ParseContext 
} = require('../index');

const ackParser = new AckParser();
const context = new ParseContext(ackParser);
const grav = Grav.login(creds.email, creds.password);

grav.test().then(data => {
  const response = context.parse(data);
  console.log(response);
}).catch(err => console.log(err));