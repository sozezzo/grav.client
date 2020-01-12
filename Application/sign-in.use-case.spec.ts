require("jasmine");
import { GravatarClient, SignInUseCase } from "../Presentation";
import { email, password } from "../Common/TestDoubles/primitive-stubs";

describe("LoadPreviousImageUseCase", () => {
  let useCase: SignInUseCase;

  beforeAll(() => {
    useCase = new SignInUseCase();
  });

  it("should work", async () => {
    useCase.email = email;
    useCase.password = password;
    const client = await useCase.execute();
    expect(client).toBeInstanceOf(GravatarClient);
  });
});
