const RATED = Object.freeze({ G:0, PG:1, R:2, X:3 });

const GRAV = Object.freeze({
  'ADDRESSES': 'grav.addresses',
  'DELETE_USER_IMAGE': 'grav.deleteUserImage',
  'EXISTS': 'grav.exists',
  'REMOVE_IMAGE': 'grav.removeImage',
  'SAVE_ENCODED_IMAGE': 'grav.saveEncodedImage',
  'SAVE_IMAGE': 'grav.saveImage',
  'SAVE_URL': 'grav.saveUrl',
  'TEST': 'grav.test',
  'USER_IMAGES': 'grav.userImages',
  'USE_USER_IMAGE': 'grav.useUserImage',
});

module.exports = { 
  GRAV, RATED
};