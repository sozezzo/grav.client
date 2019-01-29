const creds = require('../creds');
const fs = require('fs');
const { 
  Grav, SaveUrlParser, ParseContext
 } = require('../index');

//internally, grav.saveData relies upon grav.saveUrl
const saveUrlParser = new SaveUrlParser();
const context = new ParseContext(saveUrlParser);
const bitmap = fs.readFileSync('./gump.jpg');
const imageData = new Buffer(bitmap).toString('base64');
const grav = Grav.login(creds.email, creds.password);

grav.saveData(imageData, 'jpg').then(data => {
  const response = context.parse(data);
  console.log(response);
}).catch(err => console.log(err));