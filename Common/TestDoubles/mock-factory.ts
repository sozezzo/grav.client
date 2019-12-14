require("jasmine");

import { GravatarClient } from "../../Presentation";
import { HttpShim } from "../../Infrastructure/http-shim";
import { ExistsMethodResponse, TestMethodResponse } from "../../Domain/method-responses";
import { post } from "fetch-mock";

import { email, password, emailHash } from "./primitive-stubs";
import { origin } from '../../Infrastructure/http-shim';

import * as Stub from './http-response-stubs';
import * as existsJsonResponse from './JsonResponses/grav.exists.json';
import * as testJsonResponse from './JsonResponses/grav.test.json';

import { Result } from "../result";
import { UseCaseType } from "../../Common/use-case-type";

export function mockHttpShim(responseStub: Stub.ResponseStub) : HttpShim {
  const httpShim = new HttpShim(emailHash);
  spyOn(httpShim, 'rpc').and.returnValue(responseStub.value);
  return httpShim;
};

export function mockHttpRequests(){  
  post(`${origin}/xmlrpc?user=${emailHash}`, 200)
 .post('https://dailyavatar.io/api/v1/avatars', 200)
 .post('https://dailyavatar.io/api/v1/avatars/base64', 200); 
};

export function mockExistsResult(useSuccess: boolean){
  const response = new ExistsMethodResponse("");
  response.json = existsJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

export function mockTestResult(useSuccess: boolean){
  const response = new TestMethodResponse("");
  response.json = testJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

export function mockClient(type: UseCaseType = UseCaseType.None, useSuccess: boolean = true): GravatarClient {
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