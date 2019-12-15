import { SetNewImageUseCase } from './set-new-image.use-case';
import { mockClient } from '../Common/TestDoubles/mock-factory';
import { UseCaseType } from '../Common/use-case-type';
import { imageFilePath } from '../Common/TestDoubles/Stubs/primitive-stubs';
import { ImageRating } from '../Presentation';

describe('SetNewImageUseCase',() => {
  let useCase: SetNewImageUseCase;

  beforeAll(() => {
    useCase = new SetNewImageUseCase();
    useCase.client = mockClient(UseCaseType.SetNewImage);
    useCase.imagePath = imageFilePath;
    useCase.imageRating = ImageRating.G;
  })

  it('should work', async () => {
    const newImageName = await useCase.execute();
    expect(newImageName).toBeDefined();
  })
})
