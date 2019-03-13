require('dotenv').config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const { 
  Grav, UserImagesParser, DeleteUserImageParser,
  ParseContext
} = require('../index');

const userImagesParser = new UserImagesParser();
const context = new ParseContext(userImagesParser);
const grav = Grav.login(email, password);

grav.userImages()
    .then(userImages => context.parse(userImages))
    .then(images => images[0])
    .then(image => grav.deleteUserImage(image.name))
    .then(deleteUserImageResponse => {
      context.parser = new DeleteUserImageParser();
      return context.parse(deleteUserImageResponse);
    })
    .then(console.log)
    .catch(console.log);
