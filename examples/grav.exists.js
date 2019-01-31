const creds = require('../creds');
const { 
  Grav, ExistsParser, ParseContext
} = require('../index');

const existsParser = new ExistsParser();
const context = new ParseContext(existsParser);
const grav = Grav.login(creds.email, creds.password);

grav.exists().then(data => {
  const response = context.parse(data);
  console.log(response);
}).catch(err => console.log(err));