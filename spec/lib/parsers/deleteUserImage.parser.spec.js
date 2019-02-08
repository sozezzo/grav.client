const DeleteUserImage = require('../../../lib/parsers/deleteUserImage.parser');
const rawResponse = require('../../responses/grav.deleteUserImage');

describe('deleteUserImage.parser', function(){

  let deleteUserImage;
  let parsedResponse;

  beforeEach(function(){
     deleteUserImage = new DeleteUserImage();
     deleteUserImage.data = rawResponse;
     parsedResponse = null;
  })

  it('should have collect and transform methods', function(){
    expect(deleteUserImage.collect).toBeDefined();
    expect(deleteUserImage.transform).toBeDefined();
  })

  it('should collect', function(){
    deleteUserImage.collect();
    expect(deleteUserImage.data.response).toBeDefined();
  })

  it('should transform', function(){
    deleteUserImage.collect();
    parsedResponse = deleteUserImage.transform();
    expect(parsedResponse.deleted).toBeDefined();
    expect(parsedResponse.deleted).toBeTruthy();
  })

})