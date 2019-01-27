const creds = require('../creds');
const { 
  Grav, TestParser, ParseContext 
} = require('../index');

const testParser = new TestParser();
const context = new ParseContext(testParser);
const grav = Grav.login(creds.email, creds.password);

grav.test().then(data => {
  const response = context.parse(data);
  console.log(response);
}).catch(err => console.log(err));