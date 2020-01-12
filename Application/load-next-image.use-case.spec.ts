require("jasmine");
import { LoadNextImageUseCase } from "./load-next-image.use-case";
import { mockClient } from "../Common/TestDoubles/mock-factory";
import { UseCaseType } from "./use-case-type";

describe("LoadNextImageUseCase", () => {
  let useCase: LoadNextImageUseCase;

  beforeAll(() => {
    useCase = new LoadNextImageUseCase();
    useCase.client = mockClient(UseCaseType.LoadNextImage);
  });

  it("should work", async () => {
    const nextImageName = await useCase.execute();
    expect(nextImageName).toBeDefined();
  });
});
