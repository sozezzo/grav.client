const creds = require('../creds');
const { 
  Grav, UserImagesParser, DeleteUserImageParser,
  ParseContext
} = require('../index');

const userImagesParser = new UserImagesParser();
const context = new ParseContext(userImagesParser);
const grav = Grav.login(creds.email, creds.password);

grav.userImages()
    .then(userImages => context.parse(userImages))
    .then(images => images[0])
    .then(image => grav.deleteUserImage(image.name))
    .then(deleteUserimageResponse => {
      context.parser = new DeleteUserImageParser();
      return context.parse(deleteUserimageResponse);
    })
    .then(console.log)
    .catch(console.log);
