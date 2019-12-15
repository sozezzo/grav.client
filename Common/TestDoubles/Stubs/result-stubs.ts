import { 
  ExistsMethodResponse,
  AddressesMethodResponse,
  UserImagesMethodResponse,
  SaveImageUrlMethodResponse,
  UseUserImageMethodResponse,
  TestMethodResponse 
} from "../../../Domain/method-responses";

import * as existsJsonResponse from '../JsonResponses/grav.exists.json';
import * as addressesJsonResponse from '../JsonResponses/grav.addresses.json';
import * as userImagesJsonResponse from '../JsonResponses/grav.userImages.json';
import * as saveImageUrlResponse from '../JsonResponses/grav.saveUrl.json';
import * as useUserImageJsonResponse from '../JsonResponses/grav.useUserImage.json';
import * as testJsonResponse from '../JsonResponses/grav.test.json';

import { Result } from "../../result";

export function ExistsResult(useSuccess: boolean){
  const response = new ExistsMethodResponse("");
  response.json = existsJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

export function AddressesResult(useSuccess: boolean){
  const response = new AddressesMethodResponse("");
  response.json = addressesJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

export function UserImagesResult(useSuccess: boolean){
  const response = new UserImagesMethodResponse("");
  response.json = userImagesJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

export function SaveImageUrlResult(useSuccess: boolean){
  const response = new SaveImageUrlMethodResponse("");
  response.json = saveImageUrlResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

export function UseUserImageResult(useSuccess: boolean){
  const response = new UseUserImageMethodResponse("");
  response.json = useUserImageJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

export function TestResult(useSuccess: boolean){
  const response = new TestMethodResponse("");
  response.json = testJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}
