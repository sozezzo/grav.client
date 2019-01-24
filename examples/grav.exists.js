const Grav = require('../index');
const creds = require('../creds');

const grav = Grav.login(creds.email, creds.password);

grav.exists().then(data => console.log(data));