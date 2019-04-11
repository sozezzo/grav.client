const RemoveImageParser = require('../../../lib/parsers/removeImage.parser');
const response = require('../../responses/grav.removeImage');

const getParser = () => {
  const parser = new RemoveImageParser();
  parser.data = response;
  return parser;
}

describe('RemoveImageParser', function(){  
  
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