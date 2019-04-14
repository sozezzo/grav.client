const fake = require('../../spec/fake');
const api = {};

api.get = () => {
  return Promise.resolve(true);
}

api.post = () => Promise.resolve(fake.imageUrl);

module.exports = api;