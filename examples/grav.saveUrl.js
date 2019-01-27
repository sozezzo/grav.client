var Grav = require('../index');
const creds = require('../creds');
const SaveUrlParser = require('../core/parsers/saveUrl.parser');
const ParseContext = require('../core/parsers/_parse.context');

const saveUrlParser = new SaveUrlParser();
const context = new ParseContext(saveUrlParser);
const grav = Grav.login(creds.email, creds.password);

const imageUrl = "https://via.placeholder.com/150";

grav.saveUrl(imageUrl).then(data => {
  const response = context.parse(data);
  console.log(response);
}).catch(err => console.log(err));