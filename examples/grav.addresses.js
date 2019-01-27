var Grav = require('../index');
const creds = require('../creds');
const AddressParser = require('../core/parsers/address.parser');
const ParseContext = require('../core/parsers/_parse.context');

const addressParser = new AddressParser();
const context = new ParseContext(addressParser);
const grav = Grav.login(creds.email, creds.password);

grav.addresses().then(data => {
  const addressData = context.parse(data);
  console.log(addressData);
}).catch(err => console.log(err));