require('dotenv').config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const { 
  Grav, TestParser, ParseContext 
} = require('../index');

const testParser = new TestParser();
const context = new ParseContext(testParser);
const grav = Grav.login(email, password);

grav.test()
    .then(data => context.parse(data))
    .then(console.log)
    .catch(console.log);