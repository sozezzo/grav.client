import {
  ExistsMethodResponse,
  AddressesMethodResponse,
  UserImagesMethodResponse,
  SaveImageUrlMethodResponse,
  UseUserImageMethodResponse,
  TestMethodResponse
} from "../../../Domain/method-responses";

import * as stub from "../Stubs/json-response-stubs";

import { Result } from "../../result";

export function ExistsResult(
  useSuccess: boolean,
  useMultipleEmails: boolean = false
) {
  const response = new ExistsMethodResponse("");
  response.json = useMultipleEmails
    ? stub.existsJsonResponseMultiple
    : stub.existsJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

export function AddressesResult(useSuccess: boolean) {
  const response = new AddressesMethodResponse("");
  response.json = stub.addressesJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

export function UserImagesResult(useSuccess: boolean) {
  const response = new UserImagesMethodResponse("");
  response.json = stub.userImagesJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

export function SaveImageUrlResult(useSuccess: boolean) {
  const response = new SaveImageUrlMethodResponse("");
  response.json = stub.saveImageUrlResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

export function UseUserImageResult(useSuccess: boolean) {
  const response = new UseUserImageMethodResponse("");
  response.json = stub.useUserImageJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

export function TestResult(useSuccess: boolean) {
  const response = new TestMethodResponse("");
  response.json = stub.testJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}
