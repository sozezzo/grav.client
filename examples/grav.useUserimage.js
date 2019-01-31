const creds = require('../creds');
const {
  Grav, ParseContext,
  UserImagesParser, UseUserImageParser
} = require('../index');

const userImagesParser = new UserImagesParser();
const context = new ParseContext(userImagesParser);
const grav = Grav.login(creds.email, creds.password);

// collect all avatars
grav.userimages().then(data => {
  // pick one
  const images = context.parse(data);
  const selectedImage = images[0];
  // set as primary avatar
  grav.useUserimage(selectedImage.name).then(data => {
    context.parser = new UseUserImageParser();
    const response = context.parse(data);
    console.log(response);
  }).catch(err => console.log(err));
}).catch(err => console.log(err));