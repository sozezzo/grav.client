require('dotenv').config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const { RATED } = require('../lib/constants');
const { 
  Grav, SaveUrlParser, ParseContext, 
} = require('../index');

const saveUrlParser = new SaveUrlParser();
const context = new ParseContext(saveUrlParser);
const grav = Grav.login(email, password);

const imageUrl = "https://via.placeholder.com/150";

grav.saveUrl(imageUrl, RATED.G)
    .then(data => context.parse(data))
    .then(console.log)
    .catch(console.log);