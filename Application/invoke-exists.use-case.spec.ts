import { InvokeExistsUseCase } from './invoke-exists.use-case';

describe('InvokeExistsUsecase', () => {
  let useCase : InvokeExistsUseCase;
  beforeEach(() => {
    useCase = new InvokeExistsUseCase();
  })
  it('should work', () => {
    expect(true).toBe(true);
  })
})
