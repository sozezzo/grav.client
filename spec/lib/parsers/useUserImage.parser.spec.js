const UseUserImageParser = require('../../../lib/parsers/useUserImage.parser');
const rawResponse = require('../../responses/grav.useUserImage');
let useUserImageParser;
let parsedResponse;

describe('useUserImage.parser', function(){  

  beforeEach(function(){
    useUserImageParser = new UseUserImageParser();
    useUserImageParser.data = rawResponse;
    parsedResponse = null;
  })

  it('should parse', function(){
    expect(useUserImageParser.collect).toBeDefined();
    useUserImageParser.collect();
    expect(useUserImageParser.response).toBeDefined();
    parsedResponse = useUserImageParser.transform()
    expect(parsedResponse.response).toBeDefined();
  })

})