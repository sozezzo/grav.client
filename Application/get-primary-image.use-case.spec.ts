import { GetPrimaryImageUseCase } from "./get-primary-image.use-case";
import { mockClient } from "../Common/TestDoubles/mock-factory";
import { UseCaseType } from "../Common/use-case-type";

describe("GetPrimaryImageUseCase", () => {
  let useCase: GetPrimaryImageUseCase;

  beforeAll(() => {
    useCase = new GetPrimaryImageUseCase();
    useCase.client = mockClient(UseCaseType.GetPrimaryImage);
  });

  it("should work", async () => {
    const primaryImageName = await useCase.execute();
    expect(primaryImageName).toBeDefined();
  });
});
