require("jasmine");
import { FindImageUseCase } from "./find-image.use-case";
import { mockClient } from "../Common/TestDoubles/mock-factory";
import { UseCaseType } from "./use-case-type";
import { imageName } from "../Common/TestDoubles/primitive-stubs";

describe("FindImageUseCase", () => {
  let useCase: FindImageUseCase;

  beforeAll(() => {
    useCase = new FindImageUseCase();
    useCase.imageName = imageName;
    useCase.client = mockClient(UseCaseType.FindImage);
  });

  it("should work", async () => {
    const primaryImage = await useCase.execute();
    expect(primaryImage).toBeDefined();
  });
});
