const Parsers = require('../../lib/parsers');
const { RATED } = require('../../lib/constants');
const Grav = require('../../lib/index');
const fake = require('../fake');

jest.mock('fs');
jest.mock('../../lib/grav.api');

const getGrav = (autoParse) => {
  const grav = new Grav(fake.userEmail, fake.userPassword);
  if(autoParse){
    grav.autoParse = true;
    const mockParseContext = jest.fn();
    mockParseContext.mockReturnValue({ parse: jest.fn(m => true) })
    grav.getParseContext = mockParseContext;
  }
  return grav;
}
const getSaveUrlMock = () => {
  const saveUrlMock = jest.fn();
  saveUrlMock.mockReturnValue({ imageName: fake.imageName });
  return saveUrlMock;
}

describe('Grav', () => {

  const parameters = [
    ['addresses', Parsers.AddressParser],
    ['deleteUserImage', Parsers.DeleteUserImageParser],
    ['exists', Parsers.ExistsParser],
    ['removeImage', Parsers.RemoveImageParser],
    ['saveUrl', Parsers.SaveUrlParser],
    ['test', Parsers.TestParser],
    ['userImages', Parsers.UserImagesParser],
    ['useUserImage', Parsers.UseUserImageParser],
  ];

  it('should return object after login', () => {
    expect(Grav.login(fake.userEmail, fake.userPassword)).toBeInstanceOf(Object);
  })

  it('should get parse context', () => {
    const grav = getGrav();
    const context = grav.getParseContext(Parsers.TestParser);
    expect(context.parser).toBeInstanceOf(Parsers.TestParser);
  })

  describe('Parsing:', () => {
    test.each(parameters)
    ('Grav.%s: should parse raw response', (method) => {
      const grav = getGrav();
      return grav[method]().then(response => {
        expect(response).toEqual(true);
      });
    })
  })

  describe('Auto-Parsing:', () => {
    test.each(parameters)
    ('Grav.%s: should auto parse response', (method, parser) => {
      const grav = getGrav(autoParse=true);
      return grav[method]().then(response => {
        const parseContext = grav.getParseContext.mock.results[0].value;
        expect(grav.getParseContext).toHaveBeenCalledWith(parser);
        expect(parseContext.parse).toHaveBeenCalledWith(true);
        expect(response).toEqual(true);
      })
    })
  })

  describe('Grav.saveImage', () => {
    const grav = getGrav(true);
    grav.saveUrl = getSaveUrlMock();
    it('should return image url', () => {
      return grav.saveImage(fake.imageUrl, RATED.G).then(response => {
        expect(response.imageName).toBe(fake.imageName);
      });
    });
  })

  describe('Grav.saveEncodedImage', () => {
    const grav = getGrav(true);
    grav.saveUrl = getSaveUrlMock();
    it('should return image url', () => {
      return grav.saveEncodedImage(fake.imageData, 'png', RATED.G).then(response => {
        expect(response.imageName).toBe(fake.imageName);
      });
    });
  })

})