import { Grav } from './index';

describe('grav.client', function() {
  let grav : Grav;
  beforeEach(() => {
    grav = new Grav();
  })
  it('should have login method', function() {
    expect(grav.login).toBeDefined();
  });
  it('should have test method', function() {
    expect(grav.test).toBeDefined();
  });
});
