require("jasmine");
import { SetNewImageUseCase } from "./set-new-image.use-case";
import { mockClient } from "../Common/TestDoubles/mock-factory";
import { UseCaseType } from "./use-case-type";
import { imageFilePath } from "../Common/TestDoubles/primitive-stubs";
import { ImageRating } from "../Presentation";

describe("SetNewImageUseCase", () => {
  let useCase: SetNewImageUseCase;

  beforeAll(() => {
    useCase = new SetNewImageUseCase();
    useCase.client = mockClient(UseCaseType.SetNewImage);
  });

  it("should work", async () => {
    useCase.imagePath = imageFilePath;
    useCase.imageRating = ImageRating.G;
    const newImageName = await useCase.execute();
    expect(newImageName).toBeDefined();
  });
});
