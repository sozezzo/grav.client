import { GravatarClient } from "./index";
import { email, password } from "../Common/TestDoubles/Stubs/primitive-stubs";

describe("GravatarClient", function() {
  let client: GravatarClient;
  beforeEach(() => {
    client = new GravatarClient(email, password);
  });
  it("should have email hash", function() {
    expect(client.emailHash).toBeDefined();
  });
});
