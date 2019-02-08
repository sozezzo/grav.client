const ExistsParser = require('../../../lib/parsers/exists.parser');
const rawResponse = require('../../responses/grav.exists');
let existsParser;
let parsedResponse;

describe('exists.parser', function(){  

  beforeEach(function(){
    existsParser = new ExistsParser();
    existsParser.data = rawResponse;
    parsedResponse = null;
  })

  it('should parse', function(){
    expect(existsParser.collect).toBeDefined();
    existsParser.collect();
    expect(existsParser.data.response).toBeDefined();
    parsedResponse = existsParser.transform()
    expect(parsedResponse.emailHash).toBeDefined();
    expect(parsedResponse.avatarUrl).toBeDefined();
  })

})