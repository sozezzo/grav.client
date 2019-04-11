require('dotenv').config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const {
  Grav, ParseContext,
  UserImagesParser, UseUserImageParser
} = require('../index');

const userImagesParser = new UserImagesParser();
const userUserImageParser = new UseUserImageParser();
const context = new ParseContext(userImagesParser, userUserImageParser);
const grav = Grav.login(email, password);

grav.userImages()
    .then(userImages => context.parse(userImages))
    .then(images => images[0])
    .then(image => grav.useUserImage(image.name))
    .then(useUserImageResponse => {
      return context.parse(useUserImageResponse);
    })
    .then(console.log)
    .catch(console.log);