const Grav = require('../index');
const creds = require('../creds');
const { parse } = require('../core/grav.utils');

const grav = Grav.login(creds.email, creds.password);

// removes primary avatar
grav.removeImage().then(data => {
  console.log(data);
});