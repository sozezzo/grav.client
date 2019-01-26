const Grav = require('../index');
const fs = require('fs');
const creds = require('../creds');
const SaveUrlParser = require('../core/parsers/saveUrl.parser');
const ParseContext = require('../core/parsers/_parse.context');

//internally, grav.saveData relies upon grav.saveUrl
const saveUrlParser = new SaveUrlParser();
const context = new ParseContext(saveUrlParser);
const bitmap = fs.readFileSync('./gump.jpg');
const imageData = new Buffer(bitmap).toString('base64');
const grav = Grav.login(creds.email, creds.password);

grav.saveData(imageData, 'jpg').then(data => {
  const response = context.parse(data);
  console.log(response);
});