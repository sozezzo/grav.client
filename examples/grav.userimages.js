const creds = require('../creds');
const { 
  Grav,
  UserImagesParser,
  ParseContext
 } = require('../index');

const userImagesParser = new UserImagesParser();
const context = new ParseContext(userImagesParser);
const grav = Grav.login(creds.email, creds.password);

grav.userimages().then(data => {
  const userimages = context.parse(data);
  console.log(userimages);
}).catch(err => console.log(err));