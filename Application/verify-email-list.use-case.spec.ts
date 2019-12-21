import { VerifyEmailListUseCase } from "./verify-email-list.use-case";
import { mockClient } from "../Common/TestDoubles/mock-factory";
import { UseCaseType } from "../Common/use-case-type";
import {
  email,
  emailHash,
  email2,
  email2Hash
} from "../Common/TestDoubles/Stubs/primitive-stubs";

describe("VerifyEmailListUseCase", () => {
  let useCase: VerifyEmailListUseCase;

  beforeAll(() => {
    useCase = new VerifyEmailListUseCase();
    useCase.client = mockClient(UseCaseType.VerifyEmailList);
  });

  it("should work", async () => {
    useCase.emailAddresses = [email, email2];
    const exists = await useCase.execute();
    expect(exists[emailHash]).toBeDefined();
    expect(exists[email2Hash]).toBeDefined();
  });
});
