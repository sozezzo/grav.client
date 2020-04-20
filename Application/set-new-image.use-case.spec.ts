require("jasmine");
import { SetNewImageUseCase } from "./set-new-image.use-case";
import { mockClient } from "../Common/TestDoubles/mock-factory";
import { UseCaseType } from "./use-case-type";
import { imageFilePath, imageUrl } from "../Common/TestDoubles/primitive-stubs";
import { ImageRating } from "../Presentation";

describe("SetNewImageUseCase", () => {
  let useCase: SetNewImageUseCase;

  beforeAll(() => {
    useCase = new SetNewImageUseCase();
    useCase.client = mockClient(UseCaseType.SetNewImage);
  });

  it("should upload image file", async () => {
    useCase.imageFilePath = imageFilePath;
    useCase.imageRating = ImageRating.G;
    const newImageName = await useCase.execute();
    expect(newImageName).toBeDefined();
  });

  it("should upload image from url", async () => {
    useCase.imageUrl = imageUrl;
    useCase.imageRating = ImageRating.G;
    const newImageName = await useCase.execute();
    expect(newImageName).toBeDefined();
  });
});
