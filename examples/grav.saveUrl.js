const RATED = require('./image.rating');
const creds = require('../creds');
const { 
  Grav, SaveUrlParser, ParseContext, 
} = require('../index');

const saveUrlParser = new SaveUrlParser();
const context = new ParseContext(saveUrlParser);
const grav = Grav.login(creds.email, creds.password);

const imageUrl = "https://via.placeholder.com/150";

grav.saveUrl(imageUrl, RATED.G).then(data => {
  const response = context.parse(data);
  console.log(response);
}).catch(err => console.log(err));