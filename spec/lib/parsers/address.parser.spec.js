const AddressParser = require('../../../lib/parsers/address.parser');
const singleAddressResponse = require('../../responses/grav.addresses');
const multipleAddressResponse = require('../../responses/grav.addresses.two');
const faultResponse = require('../../responses/fault.response');

const getParser = (response) => {
  const parser = new AddressParser();
  parser.data = response || singleAddressResponse;
  return parser;
}

describe('AddressParser', function(){

  it('should have collect method', () => {
    const parser = getParser();
    expect(parser.collect).toBeDefined();
  });

  it('should have transform method', () => {
    const parser = getParser();
    expect(parser.transform).toBeDefined();
  });

  it('should get fault response', () => {
    const parser = getParser(faultResponse);
    parser.collect();
    expect(parser.fault).toBeDefined();
  })
  
  it('should error on fault response', () => {
    const faultCode = "-9";
    const faultString = "invalid or missing authentication information";
    const errorMessage = `faultCode ${faultCode}: ${faultString}`;
    const parser = getParser(faultResponse);
    parser.collect();
    expect(() => parser.transform()).toThrowError(errorMessage);
  })

  describe('AddressParser.collect single address', () => {
    it('should get single object from response', () => {
      const parser = getParser();
      parser.collect();
      expect(parser.data).toBeInstanceOf(Object);
    })
    it('should get single email from response', () => {
      const parser = getParser();
      parser.collect();
      expect(parser.data.email).toBeDefined();
    })
  })

  describe('AddressParser.collect multiple addresses', () => {
    it('should get array from response', () => {
      const parser = getParser(multipleAddressResponse);
      parser.collect();
      expect(parser.data.length).toBeGreaterThan(1);
    })
    it('should get each email from response', () => {
      const parser = getParser(multipleAddressResponse);
      parser.collect();
      parser.data.forEach(item => {
        expect(item.email).toBeDefined();
      })
    })
  })

  describe('AddressParser.transform single address', () => {
    const getTransform = () => {
      const parser = getParser();
      return parser.collect().transform();
    };
    it('should get rating field', () => {
      const transform = getTransform();
      expect(transform.rating).toBeDefined();
    })
    it('should get user image field', () => {
      const transform = getTransform();
      expect(transform.userimage).toBeDefined();
    })
    it('should get user image url field', () => {
      const transform = getTransform();
      expect(transform.userimage_url).toBeDefined();
    })
  })

  describe('AddressParser.transform multiple addresses', () => {
    const getTransform = () => {
      const parser = getParser(multipleAddressResponse);
      return parser.collect().transform();
    };
    it('should get array from transform', () => {
      const transform = getTransform();
      expect(transform).toBeInstanceOf(Array);
    })
    it('should get each rating field', () => {
      const transform = getTransform();
      transform.forEach(item => {
        expect(item.rating).toBeDefined();
      })
    })
    it('should get each user image field', () => {
      const transform = getTransform();
      transform.forEach(item => {
        expect(item.userimage).toBeDefined();
      })
    })
    it('should get each user image url field', () => {
      const transform = getTransform();
      transform.forEach(item => {
        expect(item.userimage_url).toBeDefined();
      })
    })
  })
})