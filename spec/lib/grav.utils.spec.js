const utils = require('../../lib/grav.utils');

const booleanField = {
      boolean: { _text: "1" }
}

const intField = {
  int: { _text: "1" }
}

const stringField = {
  string: { _text: "2 hands 10 fingers" }
}

describe('grav.utils', function(){

  it('should have correct api origin', function(){
    
    expect(utils.api_origin).toEqual("https://secure.gravatar.com");

  })

  it('should have correct rating values', function(){

    expect(utils.rating[0]).toEqual('g');
    expect(utils.rating[1]).toEqual('pg');
    expect(utils.rating[2]).toEqual('r');
    expect(utils.rating[3]).toEqual('x');
    
  })

  it('should parse raw field values', function(){
    
    expect(utils.parseFieldValue(booleanField)).toEqual(true);
    expect(utils.parseFieldValue(intField)).toEqual(1);
    expect(utils.parseFieldValue(stringField)).toEqual("2 hands 10 fingers");

  })

})