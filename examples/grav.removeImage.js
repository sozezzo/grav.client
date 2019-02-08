const creds = require('../creds');
const {
  Grav, RemoveImageParser, ParseContext
} = require('../index');

const removeImageParser = new RemoveImageParser();
const context = new ParseContext(removeImageParser);
const grav = Grav.login(creds.email, creds.password);

// removes current primary avatar
grav.removeImage()
    //.then(data => context.parse(data))
    .then(console.log)
    .catch(console.log);