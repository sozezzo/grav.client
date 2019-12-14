import * as _gravAddressesJson from '../Common/TestDoubles/JsonResponses/grav.addresses.json';
import { VerifyAccountUseCase } from './verify-account.use-case';
import { GravatarClientMockFactory } from '../Common/TestDoubles/client-mock-factory';
import { UseCaseType } from './use-case-type';

describe('VerifyAccountUseCase', () => {
  
  let useCase: VerifyAccountUseCase;

  beforeEach(() => {
    useCase = new VerifyAccountUseCase();
    useCase.client = GravatarClientMockFactory.Mock(UseCaseType.VerifyAccount);
  })

  it('should work', async () => {
    const result = await useCase.execute();
    expect(result).toBeTrue();
  })
})
