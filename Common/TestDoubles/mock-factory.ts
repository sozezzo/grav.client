require("jasmine");

import { GravatarClient } from "../../Presentation";
import { HttpShim } from "../../Infrastructure/http-shim";
import { 
  ExistsMethodResponse,
  AddressesMethodResponse,
  UserImagesMethodResponse,
  TestMethodResponse 
} from "../../Domain/method-responses";

import { email, password, emailHash } from "./primitive-stubs";
import { post } from "fetch-mock";
import { origin } from '../../Infrastructure/http-shim';

import * as Stub from './http-response-stubs';
import * as existsJsonResponse from './JsonResponses/grav.exists.json';
import * as userImagesJsonResponse from './JsonResponses/grav.userImages.json';
import * as testJsonResponse from './JsonResponses/grav.test.json';
import * as addressesJsonResponse from './JsonResponses/grav.addresses.json';

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

export function mockUserImagesResult(useSuccess: boolean){
  const response = new UserImagesMethodResponse("");
  response.json = userImagesJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

export function mockAddressesResult(useSuccess: boolean){
  const response = new AddressesMethodResponse("");
  response.json = addressesJsonResponse;
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
  let client: GravatarClient = new GravatarClient(email, password);
  switch (type) {
    case UseCaseType.GetPrimaryImage:
        spyOn(client, 'addresses').and.returnValue(mockAddressesResult(useSuccess));
        return client;
    case UseCaseType.VerifyAccount:
        spyOn(client, 'exists').and.returnValue(mockExistsResult(useSuccess));
        spyOn(client, 'test').and.returnValue(mockTestResult(useSuccess));
        return client;
    default:
        spyOn(client, 'exists').and.returnValue(mockExistsResult(useSuccess));
        return client;
  }
}
