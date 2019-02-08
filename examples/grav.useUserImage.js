const creds = require('../creds');
const {
  Grav, ParseContext,
  UserImagesParser, UseUserImageParser
} = require('../index');

const userImagesParser = new UserImagesParser();
const context = new ParseContext(userImagesParser);
const grav = Grav.login(creds.email, creds.password);

grav.userImages()
    .then(userImages => context.parse(userImages))
    .then(images => images[0])
    .then(image => grav.useUserImage(image.name))
    // .then(useUserImageResponse => {
    //   context.parser = new UseUserImageParser();
    //   return context.parse(useUserImageResponse);
    // })
    .then(console.log)
    .catch(console.log);