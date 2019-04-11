const UserImagesParser = require('../../../lib/parsers/userImages.parser');
const rawResponse = require('../../responses/grav.userImages');

describe('UserImagesParser', function(){

  const getParser = () => {
    parser = new UserImagesParser();
    parser.data = rawResponse;
    return parser;
  }

  it('should have collect method', function(){
    const parser = getParser();
    expect(parser.collect).toBeDefined();
  });

  it('should have transform method', function(){
    const parser = getParser();
    expect(parser.transform).toBeDefined();
  });

  it('should get images from response', function(){
    const parser = getParser();
    const transform = parser.collect().transform();
    expect(parser.data.images.length).toEqual(transform.length);
  })

})