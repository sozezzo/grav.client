import { GetGravatarUseCase } from './get-gravatar.use-case';

describe('GetCountersUseCase', () => {
  let useCase : GetGravatarUseCase;
  beforeEach(() => {
    useCase = new GetGravatarUseCase();
  })
  it('should work', () => {
    expect(useCase.execute).toBeDefined();
  })
})
