const ExistsParser = require('../../../lib/parsers/exists.parser');
const faultResponse = require('../../responses/fault.response');
const response = require('../../responses/grav.exists');
const fake = require('../../fake');

const getParser = (_response) => {
  const parser = new ExistsParser();
  parser.data = _response || response;
  return parser; 
}

describe('ExistsParser', () => {  

  it('should have collect method', function(){
    const parser = getParser();
    expect(parser.collect).toBeDefined();
  });

  it('should have transform method', function(){
    const parser = getParser();
    expect(parser.transform).toBeDefined();
  });

  describe('ExistsParser.collect', () => {
    it('should get member from method response', () => {
      const parser = getParser();
      const member = response.methodResponse.params.param.value.struct.member;
      parser.collect();
      expect(parser.data.response).toBe(member);
    })
    it('should get fault response', () => {
      const parser = getParser(faultResponse);
      parser.collect();
      expect(parser.fault).toBeDefined();
    })
  })

  describe('ExistsParser.transform', () => {
    it('should get email hash', () => {
      const parser = getParser();
      const transformed = parser.collect().transform();
      expect(transformed.emailHash).toBeDefined();
    })
    it('should get avatar url', () => {
      const parser = getParser();
      const transformed = parser.collect().transform();
      expect(transformed.avatarUrl).toBeDefined();
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

})