const RATED = require('./image.rating');
const creds = require('../creds');
const fs = require('fs');
const { 
  Grav, SaveUrlParser, ParseContext
 } = require('../index');

// internally, grav.saveData relies upon grav.saveUrl
const saveUrlParser = new SaveUrlParser();
const context = new ParseContext(saveUrlParser);
const bitmap = fs.readFileSync('./gump.jpg');
const imageData = new Buffer(bitmap).toString('base64');
const grav = Grav.login(creds.email, creds.password);

grav.saveData(imageData, 'jpg', RATED.G)
    .then(data => context.parse(data))
    .then(console.log)
    .catch(console.log);