const UserImagesParser = require('../../../lib/parsers/userImages.parser');
const rawResponse = require('../../responses/grav.userImages');

describe('userImages.parser', function(){

  let userImagesParser;
  let parsedResponse;

  beforeEach(function(){
     userImagesParser = new UserImagesParser();
     userImagesParser.data = rawResponse;
     parsedResponse = null;
  })

  it('should have collect and transform methods', function(){
    expect(userImagesParser.collect).toBeDefined();
    expect(userImagesParser.transform).toBeDefined();
  })

  it('should collect', function(){
    userImagesParser.collect();
    expect(userImagesParser.data.images).toBeDefined();
  })

  it('should transform', function(){
    userImagesParser.collect();
    parsedResponse = userImagesParser.transform();
    expect(Array.isArray(parsedResponse)).toBeTruthy();
  })

})