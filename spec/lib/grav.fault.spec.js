const Fault = require('../../lib/grav.fault');
const faultResponse = require('../responses/fault.response');

const fault = new Fault(faultResponse.methodResponse.fault);

describe('grav.fault', function(){

  test.each([
    ['message'],
    ['faultCode'],
    ['faultString']
  ])('should have %s', function(fieldName){
    expect(fault[fieldName]).toBeDefined();
  })

})