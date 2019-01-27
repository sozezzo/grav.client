const creds = require('../creds');
const {
  Grav, UserImagesParser, AckParser,
  ParseContext
} = require('../index');

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
    context.parser = new AckParser();
    const response = context.parse(data);
    console.log(response);
  }).catch(err => console.log(err));
}).catch(err => console.log(err));