const Grav = require('../index');
const creds = require('../creds');

const grav = Grav.login(creds.email, creds.password);

grav.test().then(data => console.log(data));