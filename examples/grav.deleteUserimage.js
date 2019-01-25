const Grav = require('../index');
const creds = require('../creds');
const { parse } = require('../core/grav.utils');

const grav = Grav.login(creds.email, creds.password);

// get avatars
grav.userimages().then(data => {
  // pick one
  const images = parse(data);
  const newImage = images[0];
  // delete it
  grav.deleteUserimage(newImage.name).then(data => {
    console.log(data);
  });
})