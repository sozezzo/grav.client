require('dotenv').config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const {
  Grav, RemoveImageParser, ParseContext
} = require('../index');

const removeImageParser = new RemoveImageParser();
const context = new ParseContext(removeImageParser);
const grav = Grav.login(email, password);

// removes current primary avatar
grav.removeImage()
    .then(data => context.parse(data))
    .then(console.log)
    .catch(console.log);