const AddressParser = require('../../../lib/parsers/address.parser');
const rawResponse = require('../../responses/grav.addresses');

describe('userImages.parser', function(){

  let addressParser;
  let parsedResponse;

  beforeEach(function(){
     addressParser = new AddressParser();
     addressParser.data = rawResponse;
     parsedResponse = null;
  })

  it('should have collect and transform methods', function(){
    expect(addressParser.collect).toBeDefined();
    expect(addressParser.transform).toBeDefined();
  })

  it('should collect', function(){
    addressParser.collect();
    expect(addressParser.data.email).toBeDefined();
    expect(addressParser.data.fields).toBeDefined();
  })

  it('should transform', function(){
    addressParser.collect();
    parsedResponse = addressParser.transform()
    expect(parsedResponse.email).toBeDefined();
    expect(parsedResponse.rating).toBeDefined();
  })

})