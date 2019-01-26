const Grav = require('../index');
const creds = require('../creds');
const UserImagesParser = require('../core/parsers/userimages.parser');
const UpdateImageParser = require('../core/parsers/updateImage.parser');
const ParseContext = require('../core/parsers/_parse.context');

const userImagesParser = new UserImagesParser();
const context = new ParseContext(userImagesParser);
const grav = Grav.login(creds.email, creds.password);

// get avatars
grav.userimages().then(data => {
  // pick one
  const images = context.parse(data);
  const newImage = images[0];
  // set as primary avatar
  grav.useUserimage(newImage.name).then(data => {
    context.parser = new UpdateImageParser();
    const response = context.parse(data);
    console.log(response);
  });
})