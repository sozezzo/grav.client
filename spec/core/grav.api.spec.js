const api = require('../../core/grav.api');

describe('api', function(){

  it('should have get method', function(){
    expect(api.get).toBeDefined();
  })

})