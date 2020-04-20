require("jasmine");
import { LoadNextImageUseCase } from "./load-next-image.use-case";
import { mockClient } from "../Common/TestDoubles/mock-factory";
import { UseCaseType } from "./use-case-type";

describe("LoadNextImageUseCase", () => {
  let useCase: LoadNextImageUseCase;

  beforeEach(() => {
    useCase = new LoadNextImageUseCase();
  });

  it("should work", async () => {
    useCase.client = mockClient(UseCaseType.LoadNextImage);
    const nextImage = await useCase.execute();
    expect(nextImage).toBeDefined();
  });

  it("should work with a single image", async () => {
    useCase.client = mockClient(UseCaseType.LoadNextImage + 100);
    const nextImage = await useCase.execute();
    expect(nextImage).toBeDefined();
  });
});
