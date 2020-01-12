require("jasmine");
import { join } from "path";
import { readFileSync } from "fs";

import { GravatarService } from "./gravatar.service";
import { HttpShim } from "../Infrastructure/http-shim";
import {
  email,
  email2,
  password,
  imageUrl,
  imageName,
  imageData,
  mimeType,
  errorMessage,
  imageFilePath,
  emailHash,
  email2Hash
} from "../Common/TestDoubles/primitive-stubs";

import * as stub from "../Common/TestDoubles/http-response-stubs";
import { mockHttpShim } from "../Common/TestDoubles/mock-factory";

describe("GravatarService", () => {
  let service: GravatarService;

  beforeAll(() => {
    service = new GravatarService(email, password);
  });
  it("should check if account exists", async () => {
    const responseStub = stub.ExistsHttpResponse(service.emailHash);
    service.http = mockHttpShim(responseStub);
    const result = await service.exists();
    expect(result.DidSucceed).toBe(true);
  });
  it("should check if multiple accounts exist", async () => {
    const responseStub = stub.ExistsMultipleHttpResponse(emailHash, email2Hash);
    service.http = mockHttpShim(responseStub);
    const result = await service.exists();
    expect(result.DidSucceed).toBe(true);
  });
  it("should have gravatar image url", () => {
    service.http = new HttpShim(service.emailHash);
    const rgx = new RegExp("^https://www.gravatar.com/avatar/(.*)$");
    expect(rgx.test(service.gravatarImageUrl)).toBeTrue();
  });
  it("should get user email address", async () => {
    const responseStub = stub.AddressesHttpResponse(service.emailHash);
    service.http = mockHttpShim(responseStub);
    const result = await service.addresses();
    expect(result.DidSucceed).toBeTrue();
  });
  it("should get user email addresses", async () => {
    const responseStub = stub.AddressesMultipleHttpResponse(email, email2);
    service.http = mockHttpShim(responseStub);
    const result = await service.addresses();
    expect(result.DidSucceed).toBeTrue();
  });
  it("should get user images", async () => {
    const responseStub = stub.UserImagesHttpResponse();
    service.http = mockHttpShim(responseStub);
    const result = await service.userImages();
    expect(result.DidSucceed).toBeTrue();
  });
  it("should save image file", async () => {
    const responseStub = stub.SaveImageHttpResponse();
    const imageFilePath = join(__dirname, "../Common/Assets/bubba.jpg");
    service.http = mockHttpShim(responseStub);
    const result = await service.saveImage(imageFilePath);
    expect(result.DidSucceed).toBeTrue();
  });
  it("should save encoded image", async () => {
    const responseStub = stub.SaveEncodedImageHttpResponse();
    service.http = mockHttpShim(responseStub);
    const imgPath = join(__dirname, "../Common/Assets/gump.jpg");
    const bitmap = readFileSync(imgPath);
    const imageData = new Buffer(bitmap).toString("base64");
    const result = await service.saveEncodedImage(imageData, "jpeg");
    expect(result.DidSucceed).toBeTrue();
  });
  it("should save image url", async () => {
    const responseStub = stub.SaveImageUrlHttpResponse();
    service.http = mockHttpShim(responseStub);
    const result = await service.saveImageUrl(imageUrl);
    expect(result.DidSucceed).toBeTrue();
  });
  it("should use user image", async () => {
    const responseStub = stub.UseUserImageHttpResponse(email);
    service.http = mockHttpShim(responseStub);
    const result = await service.useUserImage(imageName);
    expect(result.DidSucceed).toBeTrue();
  });
  it("should use user image for multiple email addresses", async () => {
    const responseStub = stub.UseUserImageMultipleHttpResponse(email, email2);
    service.http = mockHttpShim(responseStub);
    const result = await service.useUserImage(imageName, email, email2);
    expect(result.DidSucceed).toBeTrue();
  });
  it("should remove image", async () => {
    const responseStub = stub.RemoveImageHttpResponse(email);
    service.http = mockHttpShim(responseStub);
    const result = await service.removeImage();
    expect(result.DidSucceed).toBeTrue();
  });
  it("should remove image for multiple email addresses", async () => {
    const responseStub = stub.RemoveImageMultipleHttpResponse(email, email2);
    service.http = mockHttpShim(responseStub);
    const result = await service.removeImage(email, email2);
    expect(result.DidSucceed).toBeTrue();
  });
  it("should delete user image", async () => {
    const responseStub = stub.DeleteUserImageHttpResponse();
    service.http = mockHttpShim(responseStub);
    const result = await service.deleteUserImage(imageUrl);
    expect(result.DidSucceed).toBeTrue();
  });
  it("should do sanity check", async () => {
    const responseStub = stub.TestHttpResponse();
    service.http = mockHttpShim(responseStub);
    const result = await service.test();
    expect(result.DidSucceed).toBeTrue();
  });
  it("should throw", async () => {
    let error: Error = null as any;
    const responseStub = stub.FaultHttpResponse(errorMessage);
    service.http = mockHttpShim(responseStub);
    try {
      await service.exists();
    } catch (ex) {
      error = ex as Error;
    } finally {
      expect(error).toBeDefined();
    }
  });
  interface TestData {
    methodName: string;
    args: Array<string>;
  }
  it("should fail", () => {
    [
      { methodName: "exists", args: [] },
      { methodName: "addresses", args: [] },
      { methodName: "userImages", args: [] },
      { methodName: "saveImage", args: [imageFilePath] },
      { methodName: "saveEncodedImage", args: [imageData, mimeType] },
      { methodName: "saveImageUrl", args: [imageFilePath] },
      { methodName: "useUserImage", args: [imageName] },
      { methodName: "removeImage", args: [] },
      { methodName: "deleteUserImage", args: [imageName] },
      { methodName: "test", args: [] }
    ].forEach(async row => {
      const testData: TestData = row as TestData;
      const responseStub = stub.BadRequestHttpResponse(errorMessage);
      const httpShim = mockHttpShim(responseStub);
      spyOn(httpShim, "postImageFile").and.returnValue(responseStub);
      spyOn(httpShim, "postEncodedImage").and.returnValue(responseStub);
      service.http = httpShim;
      const method = (service as any)[testData.methodName].bind(service);
      const result = await method(...testData.args);
      expect(result.DidFail).toBe(true);
    });
  });
});
