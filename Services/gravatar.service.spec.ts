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
  errorMessage
} from "../Common/TestDoubles/primitive-stubs";

import * as stub from "../Common/TestDoubles/http-response-stubs";
import { mockHttpShim } from "../Common/TestDoubles/mock-factory";

describe("GravatarService", () => {
  let service: GravatarService;

  beforeAll(() => {
    service = new GravatarService(email, password);
  });
  it("should throw fault response error", async () => {
    let error: Error = null as any;
    const responseStub = stub.FaultHttpResponse(errorMessage);
    const httpShim = mockHttpShim(responseStub);
    service.http = httpShim;
    try {
      await service.exists();
    } catch (ex) {
      error = ex as Error;
    } finally {
      expect(error).toBeDefined();
    }
  });
  it("should check if account exists", async () => {
    const responseStub = stub.ExistsHttpResponse(service.emailHash);
    const httpShim = mockHttpShim(responseStub);
    service.http = httpShim;
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
    const httpShim = mockHttpShim(responseStub);
    service.http = httpShim;
    const result = await service.addresses();
    expect(result.DidSucceed).toBeTrue();
  });
  it("should get user email addresses", async () => {
    const responseStub = stub.AddressesMultipleHttpResponse(email, email2);
    const httpShim = mockHttpShim(responseStub);
    service.http = httpShim;
    const result = await service.addresses();
    expect(result.DidSucceed).toBeTrue();
  });
  it("should get user images", async () => {
    const responseStub = stub.UserImagesHttpResponse();
    const httpShim = mockHttpShim(responseStub);
    service.http = httpShim;
    const result = await service.userImages();
    expect(result.DidSucceed).toBeTrue();
  });
  it("should save image file", async () => {
    const responseStub = stub.SaveImageHttpResponse();
    const httpShim = mockHttpShim(responseStub);
    const imageFilePath = join(__dirname, "../Common/Assets/bubba.jpg");
    service.http = httpShim;
    const result = await service.saveImage(imageFilePath);
    expect(result.DidSucceed).toBeTrue();
  });
  it("should save encoded image", async () => {
    const responseStub = stub.SaveEncodedImageHttpResponse();
    const httpShim = mockHttpShim(responseStub);
    const imgPath = join(__dirname, "../Common/Assets/gump.jpg");
    const bitmap = readFileSync(imgPath);
    const imageData = new Buffer(bitmap).toString("base64");
    service.http = httpShim;
    const result = await service.saveEncodedImage(imageData, "jpeg");
    expect(result.DidSucceed).toBeTrue();
  });
  it("should save image url", async () => {
    const responseStub = stub.SaveImageUrlHttpResponse();
    const httpShim = mockHttpShim(responseStub);
    service.http = httpShim;
    const result = await service.saveImageUrl(imageUrl);
    expect(result.DidSucceed).toBeTrue();
  });
  it("should use user image", async () => {
    const responseStub = stub.UseUserImageHttpResponse(email);
    const httpShim = mockHttpShim(responseStub);
    service.http = httpShim;
    const result = await service.useUserImage(imageName);
    expect(result.DidSucceed).toBeTrue();
  });
  it("should use user image for multiple emails", async () => {
    const responseStub = stub.UseUserImageMultipleHttpResponse(email, email2);
    const httpShim = mockHttpShim(responseStub);
    service.http = httpShim;
    const result = await service.useUserImage(imageName);
    expect(result.DidSucceed).toBeTrue();
  });
  it("should remove image", async () => {
    const responseStub = stub.RemoveImageHttpResponse(email);
    const httpShim = mockHttpShim(responseStub);
    service.http = httpShim;
    const result = await service.removeImage();
    expect(result.DidSucceed).toBeTrue();
  });
  it("should delete user image", async () => {
    const responseStub = stub.DeleteUserImageHttpResponse();
    const httpShim = mockHttpShim(responseStub);
    service.http = httpShim;
    const result = await service.deleteUserImage(imageUrl);
    expect(result.DidSucceed).toBeTrue();
  });
  it("should do sanity check", async () => {
    const responseStub = stub.TestHttpResponse();
    const httpShim = mockHttpShim(responseStub);
    service.http = httpShim;
    const result = await service.test();
    expect(result.DidSucceed).toBeTrue();
  });
});
