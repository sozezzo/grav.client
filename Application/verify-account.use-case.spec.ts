import { VerifyAccountUseCase } from './verify-account.use-case';
import { mockClient } from '../Common/TestDoubles/mock-factory';
import { UseCaseType } from '../Common/use-case-type';

describe('VerifyAccountUseCase', () => {
  
  let useCase: VerifyAccountUseCase;

  beforeEach(() => {
    useCase = new VerifyAccountUseCase();
    useCase.client = mockClient(UseCaseType.VerifyAccount);
  })

  it('should work', async () => {
    const result = await useCase.execute();
    expect(result).toBeTrue();
  })
})
