import { GravatarClient } from './index';
import { email, password } from '../Common/TestDoubles/primitive-stubs';

describe('GravatarClient', function() {
  let client : GravatarClient;
  beforeEach(() => {
    client = new GravatarClient(email, password);
  })
  it('should hash email', function() {
    expect(client.emailHash).toBeDefined();
  });
});
