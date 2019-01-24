var Grav = require('../index');
const creds = require('../creds');

const grav = Grav.login(creds.email, creds.password);

const imageUrl = "https://via.placeholder.com/150";

grav.saveUrl(imageUrl).then(data => console.log(data));