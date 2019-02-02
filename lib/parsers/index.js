const AddressParser = require('./address.parser');
const DeleteUserImageParser = require('./deleteUserImage.parser');
const ExistsParser = require('./exists.parser');
const ParseContext = require('./parse.context');
const RemoveImageParser = require('./removeImage.parser');
const TestParser = require('./test.parser');
const UserImagesParser = require('./userImages.parser');
const UseUserImageParser = require('./useUserImage.parser');
const SaveUrlParser = require('./saveUrl.parser');

module.exports = {
  AddressParser, DeleteUserImageParser, ExistsParser,
  ParseContext, RemoveImageParser, TestParser,
  UserImagesParser, UseUserImageParser, SaveUrlParser
}