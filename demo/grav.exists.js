require('dotenv').config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const { 
  Grav, ExistsParser, ParseContext
} = require('../index');

const existsParser = new ExistsParser();
const context = new ParseContext(existsParser);
const grav = Grav.login(email, password);

grav.exists()
    .then(data => context.parse(data))
    .then(console.log)
    .catch(console.log);