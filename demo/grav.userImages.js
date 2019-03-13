require('dotenv').config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const { 
  Grav, UserImagesParser, ParseContext
 } = require('../index');

const userImagesParser = new UserImagesParser();
const context = new ParseContext(userImagesParser);
const grav = Grav.login(email, password);

grav.userImages()
    .then(data => context.parse(data))
    .then(console.log)
    .catch(console.log);