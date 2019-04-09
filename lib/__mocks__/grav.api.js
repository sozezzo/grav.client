const fake = require('../../spec/fake');
const api = {};

api.post = () => Promise.resolve(fake.imageUrl);

api.saveUrl = () => Promise.resolve({ imageName: fake.imageName })

module.exports = api;