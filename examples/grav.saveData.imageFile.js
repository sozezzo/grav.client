const request = require('request');
const creds = require('../creds');
const fs = require('fs');
const { 
  Grav, SaveUrlParser, ParseContext
 } = require('../index');

//internally, grav.saveData relies upon grav.saveUrl
const saveUrlParser = new SaveUrlParser();
const context = new ParseContext(saveUrlParser);
const grav = Grav.login(creds.email, creds.password);
const imageFilePath = `${__dirname}/gump.jpg`;

grav.saveData(imageFilePath).then(data => {
  const response = context.parse(data);
  console.log(response);
}).catch(err => console.log(err));