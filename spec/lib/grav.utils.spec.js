const utils = require('../../lib/grav.utils');
const fake = require('../fake');

describe('grav.utils', function(){

  it('should have correct api origin', function(){
    expect(utils.api_origin).toEqual("https://secure.gravatar.com");
  })

  test.each([
    ['g', 0],
    ['pg', 1],
    ['r', 2],
    ['x', 3],
  ])('should have "%s" rating value', (code, index) => {
    expect(utils.rating[index]).toBe(code);
  })

  test.each([
    ['bool', fake.booleanField, true],
    ['int', fake.intField, 1],
    ['string', fake.stringField, "2 hands 10 fingers"],
  ])('should parse %s field', (typeName, field, fieldValue) => {
    expect(utils.parseFieldValue(field)).toBe(fieldValue);
  })

})