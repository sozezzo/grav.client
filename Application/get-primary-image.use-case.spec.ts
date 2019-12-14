import * as _gravAddressesJson from '../Common/TestDoubles/JsonResponses/grav.addresses.json';
import { GetPrimaryImageUseCase } from './get-primary-image.use-case';

let useCase: GetPrimaryImageUseCase;

describe('GetPrimaryImageUseCase', () => {
  beforeAll(() => {
    useCase = new GetPrimaryImageUseCase();
  })
  it('should work', () => {
    expect(true).toBe(true);
  })
})
