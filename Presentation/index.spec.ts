import { Grav } from './index';

describe('grav.client', function() {
  let grav : Grav;
  beforeEach(() => {
    grav = new Grav();
  })
  it('add', function() {
    expect(grav.test).toBeDefined();
  });
});
