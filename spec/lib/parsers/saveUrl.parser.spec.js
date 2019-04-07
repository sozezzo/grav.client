const SaveUrlParser = require('../../../lib/parsers/saveUrl.parser');
const response = require('../../responses/grav.saveUrl');

describe('SaveUrlParser', function(){

  const getParser = () => {
    parser = new SaveUrlParser();
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

  it('should get response value', function(){
    const parser = getParser();
    parser.collect();
    expect(parser.data.response).toBe(response.methodResponse.params.param.value);
  })

  it('should get image name', function(){
    const parser = getParser();
    const transform = parser.collect().transform();
    expect(transform.imageName).toBeDefined();
  })

})