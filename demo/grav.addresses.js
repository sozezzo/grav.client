require('dotenv').config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const {
  Grav, AddressParser, ParseContext
} = require('../index');

const addressParser = new AddressParser();
const context = new ParseContext(addressParser);
const grav = Grav.login(email, password);

grav.addresses()
    .then(data => context.parse(data))
    .then(console.log)
    .catch(console.log);