import { InvokeTestUseCase } from './invoke-test.use-case';

describe('InvokeExistsUsecase', () => {
  let useCase : InvokeTestUseCase;
  beforeEach(() => {
    useCase = new InvokeTestUseCase();
  })
  it('should work', () => {
    expect(true).toBe(true);
  })
})
