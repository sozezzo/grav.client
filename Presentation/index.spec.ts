import { Gravatar } from './index';

describe('grav.client', function() {
  let gravatar : Gravatar;
  beforeEach(() => {
    gravatar = new Gravatar();
  })
  it('should have login method', function() {
    expect(gravatar.login).toBeDefined();
  });
  it('should have test method', function() {
    expect(gravatar.test).toBeDefined();
  });
});
