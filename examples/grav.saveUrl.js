const RATED = require('./image.rating');
const creds = require('../creds');
const { 
  Grav, SaveUrlParser, ParseContext, 
} = require('../index');

const saveUrlParser = new SaveUrlParser();
const context = new ParseContext(saveUrlParser);
const grav = Grav.login(creds.email, creds.password);

const imageUrl = "https://via.placeholder.com/150";

grav.saveUrl(imageUrl, RATED.G)
    .then(data => context.parse(data))
    .then(console.log)
    .catch(console.log);