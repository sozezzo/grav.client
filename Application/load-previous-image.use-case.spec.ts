require("jasmine");
import { LoadPreviousImageUseCase } from "./load-previous-image.use-case";
import { mockClient } from "../Common/TestDoubles/mock-factory";
import { UseCaseType } from "./use-case-type";

describe("LoadPreviousImageUseCase", () => {
  let useCase: LoadPreviousImageUseCase;

  beforeAll(() => {
    useCase = new LoadPreviousImageUseCase();
    useCase.client = mockClient(UseCaseType.LoadPreviousImage);
  });

  it("should work", async () => {
    const previousImage = await useCase.execute();
    expect(previousImage).toBeDefined();
  });
});
