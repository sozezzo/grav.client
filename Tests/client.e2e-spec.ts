import { GravatarClient } from '../Presentation';
import { config } from 'dotenv';

config({ path: 'Tests/.env' });

const email = process.env.EMAIL as string;
const password = process.env.PASSWORD as string;

describe('GravatarClient', () => {
  let client: GravatarClient;
  beforeEach(() => {
    client = new GravatarClient(email, password);
  })
  it('should invoke grav.exists', async () => {
    const result = await client.exists();
    expect(result.DidSucceed).toBe(true);
  })
})