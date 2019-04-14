
const ParseContext = require('../../../lib/parsers/parse.context');
const AckParser = require('../../../lib/parsers/ack.parser');
const data = require('../../responses/grav.test');

describe('ParseContext', () => {
  const getContext = () => {
    return new ParseContext(new AckParser());
  }
  it('should have parser',()=>{
    const context = getContext();
    expect(context.parsers.length).toBeDefined();
  })
  it('should perform collect',()=>{
    const context = getContext();
    const parser = context.parsers[0];
    const collectSpy = jest.spyOn(parser, 'collect');
    context.parse(data);
    expect(collectSpy).toHaveBeenCalled();
  })
  it('should perform transform',()=>{
    const context = getContext();
    const parser = context.parsers[0];
    const transformSpy = jest.spyOn(parser, 'transform');
    context.parse(data);
    expect(transformSpy).toHaveBeenCalled();
  })
  it('should remove parser after parsing',()=>{
    const context = getContext();
    const parserCountBeforeParse = context.parsers.length;
    context.parse(data);
    const parserCountAfterParse = context.parsers.length;
    expect(parserCountBeforeParse).toEqual(1);
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