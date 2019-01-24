const Grav = require('../index');
const fs = require('fs');
const creds = require('../creds');

const bitmap = fs.readFileSync('./gump.jpg');
const imageData = new Buffer(bitmap).toString('base64');
const grav = Grav.login(creds.email, creds.password);

grav.saveData(imageData, 'jpg').then(data => console.log(data));