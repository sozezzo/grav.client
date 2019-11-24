import { SignInUseCase } from './sign-in.use-case';
import { email, password } from '../Common/TestDoubles/primitive-stubs';

describe('SignInUseCase', () => {
  let useCase : SignInUseCase;
  beforeEach(() => {
    useCase = new SignInUseCase();
  })
  it('should work', () => {
    expect(useCase.email).toBeDefined();
    expect(useCase.password).toBeDefined();
    expect(useCase.execute).toBeDefined();
  })
  it('should allow user to sign in', async () => {
    useCase.email = email;
    useCase.password = password;
    const gravatar = await useCase.execute();
    expect(gravatar).toBeDefined();
  })
})
