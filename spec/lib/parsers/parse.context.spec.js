
const ParseContext = require('../../../lib/parsers/parse.context');
const AckParser = require('../../../lib/parsers/ack.parser');
const data = require('../../responses/grav.test');

describe('ParseContext', () => {
  const getContext = () => {
    return new ParseContext(new AckParser());
  }
  it('should have parser',()=>{
    const context = getContext();
    expect(context.parser).toBeDefined();
  })
  it('should perform collect',()=>{
    const context = getContext();
    const collectSpy = jest.spyOn(context.parser, 'collect');
    context.parse(data);
    expect(collectSpy).toHaveBeenCalled();
  })
  it('should perform transform',()=>{
    const context = getContext();
    const transformSpy = jest.spyOn(context.parser, 'transform');
    context.parse(data);
    expect(transformSpy).toHaveBeenCalled();
  })
  it('should parse data',()=>{
    const context = getContext();
    context.parse(data);
    expect(context.parser.data).toBeDefined();
  })
  it('should return object',()=>{
    const context = getContext();
    const returnValue = context.parse(data);
    expect(returnValue).toBeInstanceOf(Object);
  })
})