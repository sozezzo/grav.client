var Grav = require('../index');
const creds = require('../creds');
const UserImagesParser = require('../core/parsers/userimages.parser');
const ParseContext = require('../core/parsers/_parse.context');

const userImagesParser = new UserImagesParser();
const context = new ParseContext(userImagesParser);
const grav = Grav.login(creds.email, creds.password);

grav.userimages().then(data => {
  const userimages = context.parse(data);
  console.log(userimages);
}).catch(err => console.log(err));