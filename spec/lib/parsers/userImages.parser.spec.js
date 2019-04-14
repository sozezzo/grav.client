const UserImagesParser = require('../../../lib/parsers/userImages.parser');
const rawResponse = require('../../responses/grav.userImages');
const faultResponse = require('../../responses/fault.response');

describe('UserImagesParser', function(){

  const getParser = (_response) => {
    parser = new UserImagesParser();
    parser.data = _response || rawResponse;
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

  it('should get images from response', function(){
    const parser = getParser();
    const transform = parser.collect().transform();
    expect(parser.data.images.length).toEqual(transform.length);
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