require('dotenv').config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const RATED = require('./image.rating');
const fs = require('fs');
const { 
  Grav, SaveUrlParser, ParseContext
 } = require('../index');

// internally, grav.saveEncodedImage relies on grav.saveUrl
const saveUrlParser = new SaveUrlParser();
const context = new ParseContext(saveUrlParser);
const bitmap = fs.readFileSync('./gump.jpg');
const imageData = new Buffer(bitmap).toString('base64');
const grav = Grav.login(email, password);

grav.saveEncodedImage(imageData, 'jpeg', RATED.G)
    .then(data => context.parse(data))
    .then(console.log)
    .catch(console.log);