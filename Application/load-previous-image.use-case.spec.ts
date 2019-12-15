import { LoadPreviousImageUseCase } from './load-previous-image.use-case';
import { mockClient } from '../Common/TestDoubles/mock-factory';
import { UseCaseType } from '../Common/use-case-type';

describe('LoadPreviousImageUseCase',() => {
  let useCase: LoadPreviousImageUseCase;

  beforeAll(() => {
    useCase = new LoadPreviousImageUseCase();
    useCase.client = mockClient(UseCaseType.LoadPreviousImage);
  })

  it('should work', async () => {
    const previousImageName = await useCase.execute();
    expect(previousImageName).toBeDefined();
  })
})
