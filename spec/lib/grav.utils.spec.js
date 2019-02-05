const utils = require('../../lib/grav.utils');

describe('grav.utils', function(){

  it('api origin should be correct', function(){
    expect(utils.api_origin).toBeDefined();
    expect(utils.api_origin).toEqual("https://secure.gravatar.com");
  })

})