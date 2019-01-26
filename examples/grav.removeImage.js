const Grav = require('../index');
const creds = require('../creds');
const UpdateImageParser = require('../core/parsers/updateImage.parser');
const ParseContext = require('../core/parsers/_parse.context');

const updateImageParser = new UpdateImageParser();
const context = new ParseContext(updateImageParser);
const grav = Grav.login(creds.email, creds.password);

// removes primary avatar
grav.removeImage().then(data => {
  const response = context.parse(data);
  console.log(response);
});