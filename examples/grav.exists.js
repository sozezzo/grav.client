const creds = require('../creds');
const { 
  Grav, ExistsParser, ParseContext
} = require('../index');

const existsParser = new ExistsParser();
const context = new ParseContext(existsParser);
const grav = Grav.login(creds.email, creds.password);

grav.exists()
    .then(data => context.parse(data))
    .then(console.log)
    .catch(console.log);