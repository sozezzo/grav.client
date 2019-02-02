const creds = require('../creds');
const { 
  Grav, UserImagesParser, ParseContext
 } = require('../index');

const userImagesParser = new UserImagesParser();
const context = new ParseContext(userImagesParser);
const grav = Grav.login(creds.email, creds.password);

grav.userImages()
    .then(data => context.parse(data))
    .then(console.log)
    .catch(console.log);