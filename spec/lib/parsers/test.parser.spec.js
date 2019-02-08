const TestParser = require('../../../lib/parsers/test.parser');
const rawResponse = require('../../responses/grav.test');
let existsParser;
let parsedResponse;

describe('test.parser', function(){  

  beforeEach(function(){
    existsParser = new TestParser();
    existsParser.data = rawResponse;
    parsedResponse = null;
  })

  it('should parse', function(){
    expect(existsParser.collect).toBeDefined();
    existsParser.collect();
    expect(existsParser.response).toBeDefined();
    parsedResponse = existsParser.transform()
    expect(parsedResponse.response).toBeDefined();
    expect(parsedResponse.response).toBeDefined();
  })

})