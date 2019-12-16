require("jasmine");

import { GravatarClient } from "../../Presentation";
import { HttpShim } from "../../Infrastructure/http-shim";

import { email, password, emailHash } from "./Stubs/primitive-stubs";
import { post } from "fetch-mock";
import { origin } from '../../Infrastructure/http-shim';

import * as stub from './Stubs/result-stubs';

import { UseCaseType } from "../../Common/use-case-type";

export function mockHttpShim(responseStub: Promise<Response>) : HttpShim {
  const httpShim = new HttpShim(emailHash);
  spyOn(httpShim, 'rpc').and.returnValue(responseStub);
  return httpShim;
};

export function mockHttpRequests(){  
  post(`${origin}/xmlrpc?user=${emailHash}`, 200)
 .post('https://dailyavatar.io/api/v1/avatars', 200)
 .post('https://dailyavatar.io/api/v1/avatars/base64', 200); 
};

export function mockClient(useCaseType: UseCaseType = UseCaseType.None, useSuccess: boolean = true): GravatarClient {
  let client: GravatarClient = new GravatarClient(email, password);
  switch (useCaseType) {
    case UseCaseType.GetPrimaryImage:
        spyOn(client, 'addresses').and.returnValue(stub.AddressesResult(useSuccess));
        return client;
    case UseCaseType.VerifyAccount:
        spyOn(client, 'exists').and.returnValue(stub.ExistsResult(useSuccess));
        spyOn(client, 'test').and.returnValue(stub.TestResult(useSuccess));
        return client;
    case UseCaseType.VerifyEmailList:
        spyOn(client, 'exists').and.returnValue(stub.ExistsResult(useSuccess, true));
    case UseCaseType.LoadNextImage:
    case UseCaseType.LoadPreviousImage:
        spyOn(client, 'addresses').and.returnValue(stub.AddressesResult(useSuccess));
        spyOn(client, 'userImages').and.returnValue(stub.UserImagesResult(useSuccess));
        spyOn(client, 'useUserImage').and.returnValue(stub.UseUserImageResult(useSuccess));
        return client;
    case UseCaseType.SetNewImage:
        spyOn(client, 'saveImage').and.returnValue(stub.SaveImageUrlResult(useSuccess));
        spyOn(client, 'useUserImage').and.returnValue(stub.UseUserImageResult(useSuccess));
    default:
        spyOn(client, 'test').and.returnValue(stub.TestResult(useSuccess));
        return client;
  }
}
