require('dotenv').config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const RATED = require('./image.rating');
const { 
  Grav, SaveUrlParser, ParseContext
 } = require('../index');

// internally, grav.saveImage relies on grav.saveUrl
const saveUrlParser = new SaveUrlParser();
const context = new ParseContext(saveUrlParser);
const grav = Grav.login(email, password);
const imageFilePath = `${__dirname}/gump.jpg`;

grav.saveImage(imageFilePath, RATED.G)
    .then(data => context.parse(data))
    .then(console.log)
    .catch(console.log);