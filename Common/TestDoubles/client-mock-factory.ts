require("jasmine");
import { GravatarClient } from "../../Presentation";
import { email, password, emailHash } from "./primitive-stubs";
import { HttpShim } from "../../Infrastructure/http-shim";
import { ExistsMethodResponse, TestMethodResponse } from "../../Domain/method-responses";

import * as Stub from './http-response-stubs';
import * as existsJsonResponse from './JsonResponses/grav.exists.json';
import * as testJsonResponse from './JsonResponses/grav.test.json';

import { Result } from "../result";
import { UseCaseType } from "../../Application/use-case-type";
import { create } from "domain";

// TODO: isolate + fix imports
export function mockHttpShim(responseStub: Stub.ResponseStub) : HttpShim {
  const httpShim = new HttpShim(emailHash);
  spyOn(httpShim, 'rpc').and.returnValue(responseStub.value);
  return httpShim;
};

function mockExistsResult(useSuccess: boolean){
  const response = new ExistsMethodResponse("");
  response.json = existsJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

function mockTestResult(useSuccess: boolean){
  const response = new TestMethodResponse("");
  response.json = testJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

export class GravatarClientMockFactory {

  public static Mock(type: UseCaseType, useSuccess: boolean = true): GravatarClient {
    let client: GravatarClient;
    switch (type) {
      case UseCaseType.VerifyAccount:
          client = new GravatarClient(email, password);
          spyOn(client, 'exists').and.returnValue(mockExistsResult(useSuccess));
          spyOn(client, 'test').and.returnValue(mockTestResult(useSuccess));
          return client;
      default:
          client = new GravatarClient(email, password);
          spyOn(client, 'exists').and.returnValue(mockExistsResult(useSuccess));
          return client;
        break;
    }
  }

}