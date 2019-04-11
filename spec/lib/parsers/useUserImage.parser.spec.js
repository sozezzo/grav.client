const UseUserImageParser = require('../../../lib/parsers/useUserImage.parser');
const rawResponse = require('../../responses/grav.useUserImage');

describe('UseUserImageParser', function(){  

  const getParser = () => {
    parser = new UseUserImageParser();
    parser.data = rawResponse;
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

  it('should get response value', function(){
    const parser = getParser();
    const transform = parser.collect().transform()
    expect(transform.response).toBeDefined();
  })

})