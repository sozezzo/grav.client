import { GravatarClient } from './index';

describe('grav.client', function() {
  let client : GravatarClient;
  beforeEach(() => {
    const email = "peter.parker@example.com";
    const password = "123";
    client = new GravatarClient(email, password);
  })
  it('should hash email', function() {
    expect(client.emailHash).toBeDefined();
  });
});
