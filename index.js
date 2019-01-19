require('dotenv').config();
const Grav = require('./grav');
const utils = require('./utils');
const user = process.env.GRAV_USER;
const pw = process.env.GRAV_PW;
const url = process.env.GRAV_IMAGE;
const imageName = process.env.GRAV_IMAGE_NAME;
const grav = Grav.create(user, pw);

grav.test().then(response => console.log(response));
//grav.saveUrl(url).then(response => console.log(response));
//grav.userimages().then(response => console.log(utils.parse(response)));
//grav.useUserimage(imageName).then(response => console.log(response));