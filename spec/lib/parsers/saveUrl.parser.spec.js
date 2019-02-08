const UserImagesParser = require('../../../lib/parsers/saveUrl.parser');
const rawResponse = require('../../responses/grav.saveUrl');

describe('saveUrl.parser', function(){

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
    expect(userImagesParser.data.response).toBeDefined();
  })

  it('should transform', function(){
    userImagesParser.collect();
    parsedResponse = userImagesParser.transform();
    expect(parsedResponse.imageName).toBeDefined();
  })

})