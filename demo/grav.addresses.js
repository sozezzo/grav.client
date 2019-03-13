const creds = require('../creds');
const {
  Grav, AddressParser, ParseContext
} = require('../index');

const addressParser = new AddressParser();
const context = new ParseContext(addressParser);
const grav = Grav.login(creds.email, creds.password);

grav.addresses()
    .then(data => context.parse(data))
    .then(console.log)
    .catch(console.log);