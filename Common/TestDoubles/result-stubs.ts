import {
  ExistsMethodResponse,
  AddressesMethodResponse,
  UserImagesMethodResponse,
  SaveImageUrlMethodResponse,
  UseUserImageMethodResponse,
  TestMethodResponse,
} from "../../Domain/method-responses";

import * as stub from "./json-response-stubs";
import * as xml from "./xml-response-stubs";

import { Result } from "../result";

export function ExistsResult() {
  const response = new ExistsMethodResponse("");
  response.json = stub.existsJsonResponse;
  response.parseMembers();
  response.success = true;
  return Promise.resolve(response);
}

export function ExistsResultMultiple() {
  const response = new ExistsMethodResponse("");
  response.json = stub.existsJsonResponseMultiple;
  response.parseMembers();
  response.success = true;
  return Promise.resolve(Result.Ok(response));
}

export function AddressesResult() {
  const response = new AddressesMethodResponse(xml.addressesXml);
  response.json = stub.addressesJsonResponse;
  response.parseMembers();
  return Promise.resolve(response);
}

export function UserImagesResult() {
  const response = new UserImagesMethodResponse(xml.userImagesXml);
  response.json = stub.userImagesJsonResponse;
  response.parseMembers();
  return Promise.resolve(response);
}

export function UserImagesResultSingleImage() {
  const response = new UserImagesMethodResponse(xml.userImagesSingleXml);
  response.json = stub.userImagesSingleJsonResponse;
  response.parseMembers();
  return Promise.resolve(response);
}

export function SaveImageUrlResult() {
  const response = new SaveImageUrlMethodResponse("");
  response.json = stub.saveImageUrlResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

export function UseUserImageResult() {
  const response = new UseUserImageMethodResponse("");
  response.json = stub.useUserImageJsonResponse;
  response.parseMembers();
  return Promise.resolve(response);
}

export function TestResult() {
  const response = new TestMethodResponse("");
  response.json = stub.testJsonResponse;
  response.parseMembers();
  return Promise.resolve(response);
}
