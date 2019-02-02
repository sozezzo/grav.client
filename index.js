const AddressParser = require('./core/parsers/address.parser');
const DeleteUserImageParser = require('./core/parsers/deleteUserImage.parser');
const ExistsParser = require('./core/parsers/exists.parser');
const Grav = require('./core/grav');
const ParseContext = require('./core/parsers/parse.context');
const RemoveImageParser = require('./core/parsers/removeImage.parser');
const TestParser = require('./core/parsers/test.parser');
const UserImagesParser = require('./core/parsers/userimages.parser');
const UseUserImageParser = require('./core/parsers/useUserImage.parser');
const SaveUrlParser = require('./core/parsers/saveUrl.parser');

module.exports = {
  AddressParser, DeleteUserImageParser, ExistsParser,
  Grav, ParseContext, RemoveImageParser, TestParser,
  UserImagesParser, UseUserImageParser, SaveUrlParser
};