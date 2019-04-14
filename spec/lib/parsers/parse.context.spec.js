
const ParseContext = require('../../../lib/parsers/parse.context');
const AckParser = require('../../../lib/parsers/ack.parser');
const data = require('../../responses/grav.test');
describe('ParseContext', () => {
  const parser = new AckParser();
  const getContext = (queue=false) => {
    return new ParseContext(parser);
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
  it('should queue parsers',()=>{
    const context = new ParseContext(parser, parser);
    expect(context.parsers.length).toEqual(2);
  })
  it('should remove parsers from queue',()=>{
    const context = new ParseContext(parser, parser);
    const parserCountBeforeParse = context.parsers.length;
    context.parse(data);
    context.parse(data);
    const parserCountAfterParse = context.parsers.length;
    expect(parserCountBeforeParse).toEqual(2);
    expect(parserCountAfterParse).toEqual(0);
  })
  it('should return object',()=>{
    const context = getContext();
    const returnValue = context.parse(data);
    expect(returnValue).toBeInstanceOf(Object);
  })
  it('should not return object if parser missing ',()=>{
    const context = new ParseContext();
    const returnValue = context.parse(data);
    expect(returnValue).toBeUndefined();
  })
})