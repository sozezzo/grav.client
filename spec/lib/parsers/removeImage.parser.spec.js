const RemoveImageParser = require('../../../lib/parsers/removeImage.parser');
const rawResponse = require('../../responses/grav.removeImage');
let removeImageParser;
let parsedResponse;

describe('useUserImage.parser', function(){  

  beforeEach(function(){
    removeImageParser = new RemoveImageParser();
    removeImageParser.data = rawResponse;
    parsedResponse = null;
  })

  it('should parse', function(){
    expect(removeImageParser.collect).toBeDefined();
    removeImageParser.collect();
    expect(removeImageParser.response).toBeDefined();
    parsedResponse = removeImageParser.transform()
    expect(parsedResponse.response).toBeDefined();
  })

})