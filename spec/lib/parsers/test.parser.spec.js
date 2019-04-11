const TestParser = require('../../../lib/parsers/test.parser');
const response = require('../../responses/grav.test');

describe('TestParser', function(){  

  const getParser = () => {
    parser = new TestParser();
    parser.data = response;
    return parser;
  }

  it('should have collect method', function(){
    const parser = getParser();
    expect(parser.collect).toBeDefined();
  });

  it('should have transform method', function(){
    const parser = getParser();
    expect(parser.transform).toBeDefined();
  });

  it('should parse response', function(){
    const parser = getParser();
    const transform = parser.collect().transform();
    expect(parser.response).toBe(transform.response);
  })

})