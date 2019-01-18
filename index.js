require('dotenv').config();
const Grav = require('./grav');
const user = process.env.GRAV_USER;
const pw = process.env.GRAV_PW;
const grav = new Grav(user, pw);

grav.userimages().then((data) => {
  console.log(data);
})
