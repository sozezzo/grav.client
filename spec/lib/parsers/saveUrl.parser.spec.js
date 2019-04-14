const SaveUrlParser = require('../../../lib/parsers/saveUrl.parser');
const response = require('../../responses/grav.saveUrl');
const faultResponse = require('../../responses/fault.response');

describe('SaveUrlParser', function(){

  const getParser = (_response) => {
    parser = new SaveUrlParser();
    parser.data = _response || response;
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

  it('should get fault response', () => {
    const parser = getParser(faultResponse);
    parser.collect();
    expect(parser.fault).toBeDefined();
  })
  
  it('should error on fault response', () => {
    const faultCode = "-9";
    const faultString = "invalid or missing authentication information";
    const errorMessage = `faultCode ${faultCode}: ${faultString}`;
    const parser = getParser(faultResponse);
    parser.collect();
    expect(() => parser.transform()).toThrowError(errorMessage);
  })

})