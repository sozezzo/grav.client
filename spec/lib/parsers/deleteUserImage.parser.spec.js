const DeleteUserImageParser = require('../../../lib/parsers/deleteUserImage.parser');
const response = require('../../responses/grav.deleteUserImage');
const faultResponse = require('../../responses/fault.response');

const getParser = (_response) => {
  const parser = new DeleteUserImageParser();
  parser.data = _response || response;;
  return parser;
}

describe('DeleteUserImageParser', function(){

  it('should have collect method', () => {
    const parser = getParser();
    expect(parser.collect).toBeDefined();
  });

  it('should have transform method', () => {
    const parser = getParser();
    expect(parser.transform).toBeDefined();
  });

  it('should collect response value from method response', function(){
    const responseValue = response.methodResponse.params.param.value;
    const parser = getParser();
    parser.collect();
    expect(parser.data.response).toBe(responseValue);
  })

  it('should get boolean response after transform', function(){
    const parser = getParser();
    const transform = parser.collect().transform();
    expect(transform.deleted).toBe(true);
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