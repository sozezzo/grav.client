import { SignInUseCase } from './sign-in.use-case';

describe('LoginUseCase', () => {
  let useCase : SignInUseCase;
  beforeEach(() => {
    useCase = new SignInUseCase();
  })
  it('should work', () => {
    expect(useCase.email).toBeDefined();
    expect(useCase.password).toBeDefined();
    expect(useCase.execute).toBeDefined();
  })
})
