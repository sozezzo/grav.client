require("jasmine");

import { GravatarClient } from "../../Presentation";
import { HttpShim } from "../../Infrastructure/http-shim";

import { email, password, emailHash } from "./primitive-stubs";

import nock from "nock";

import { origin } from "../../Infrastructure/http-shim";

import * as stub from "./result-stubs";

import { UseCaseType } from "../../Application/use-case-type";

export function mockHttpShim(responseStub: Promise<Response>): HttpShim {
  const httpShim = new HttpShim(emailHash);
  spyOn(httpShim, "rpc").and.returnValue(responseStub);
  return httpShim;
}

export function mockHttpRequests() {
  nock(origin)
    .post(`/xmlrpc?user=${emailHash}`)
    .reply(200);
  nock("https://dailyavatar.io")
    .post(`/api/v1/avatars`)
    .reply(200)
    .persist();
}

export function mockClient(
  useCaseType: UseCaseType = UseCaseType.None
): GravatarClient {
  let client: GravatarClient = new GravatarClient(email, password);
  switch (useCaseType) {
    case UseCaseType.FindImage:
      spyOn(client, "userImages").and.returnValue(stub.UserImagesResult());
      return client;
    case UseCaseType.GetPrimaryImage:
      spyOn(client, "addresses").and.returnValue(stub.AddressesResult());
      return client;
    case UseCaseType.VerifyAccount:
      spyOn(client, "exists").and.returnValue(stub.ExistsResult());
      spyOn(client, "test").and.returnValue(stub.TestResult());
      return client;
    case UseCaseType.LoadNextImage:
    case UseCaseType.LoadPreviousImage:
      spyOn(client, "addresses").and.returnValue(stub.AddressesResult());
      spyOn(client, "userImages").and.returnValue(stub.UserImagesResult());
      spyOn(client, "useUserImage").and.returnValue(stub.UseUserImageResult());
      return client;
    case UseCaseType.SetNewImage:
      spyOn(client, "saveImage").and.returnValue(stub.SaveImageUrlResult());
      spyOn(client, "useUserImage").and.returnValue(stub.UseUserImageResult());
      return client;
    default:
      return client;
  }
}
