const AckParser = require('../../../lib/parsers/ack.parser');
const rawResponse = require('../../responses/grav.test');
const faultResponse = require('../../responses/fault.response');

describe('UseUserImageParser', function(){  

  const getParser = (_response) => {
    parser = new AckParser();
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

  it('should get response value', function(){
    const parser = getParser();
    const transform = parser.collect().transform();
    expect(transform.response).toBeDefined();
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