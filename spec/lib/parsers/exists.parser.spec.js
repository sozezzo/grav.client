const ExistsParser = require('../../../lib/parsers/exists.parser');
const response = require('../../responses/grav.exists');

const getParser = () => {
  const parser = new ExistsParser();
  parser.data = response;
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
  })

  describe('ExistsParser.transform', () => {
    it('should get email hash', () => {
      const parser = getParser();
      parser.collect();
      const transformed = parser.transform();
      expect(transformed.emailHash).toBeDefined();
    })
    it('should get avatar url', () => {
      const parser = getParser();
      parser.collect();
      const transformed = parser.transform();
      expect(transformed.avatarUrl).toBeDefined();
    })
  })

})