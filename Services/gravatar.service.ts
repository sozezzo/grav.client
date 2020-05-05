import { Md5 } from "ts-md5/dist/md5";
import { HttpShim } from "../Infrastructure/http-shim";
import { Result } from "../Common/result";
import { ImageRating } from "../Domain/image-rating";
import { readFileSync, existsSync } from "fs";

import {
  AddressesMethodCall,
  ExistsMethodCall,
  UserImagesMethodCall,
  SaveDataMethodCall,
  SaveImageUrlMethodCall,
  UseUserImageMethodCall,
  RemoveImageMethodCall,
  DeleteUserImageMethodCall,
  TestMethodCall,
} from "../Domain/method-calls";

import {
  AddressesMethodResponse,
  ExistsMethodResponse,
  UserImagesMethodResponse,
  SaveImageUrlMethodResponse,
  UseUserImageMethodResponse,
  RemoveImageMethodResponse,
  DeleteUserImageMethodResponse,
  TestMethodResponse,
} from "../Domain/method-responses";

export class GravatarService {
  public email: string;
  private _password: string;
  public emailHash: string;
  public http: HttpShim;

  public get gravatarImageUrl(): string {
    return `https://www.gravatar.com/avatar/${this.emailHash}`;
  }

  constructor(userEmail: string, userPassword: string) {
    this.email = `${userEmail}`.trim().toLowerCase();
    this.emailHash = this.hashEmail(this.email);
    this._password = userPassword;
  }
  public hashEmail(email: string): string {
    return Md5.hashStr(email).toString();
  }
  public async exists(
    ...emailAddresses: string[]
  ): Promise<ExistsMethodResponse> {
    const addresses = emailAddresses.length ? emailAddresses : [this.email];
    const hashes = addresses.map(this.hashEmail);
    const methodCall = new ExistsMethodCall(hashes, this._password);
    const response = await this.http.rpc(methodCall.xml);
    if (response.ok) {
      const xmlResponse = await response.text();
      return new ExistsMethodResponse(xmlResponse);
    } else {
      throw response.statusText;
    }
  }
  public async addresses(): Promise<AddressesMethodResponse> {
    const methodCall = new AddressesMethodCall(this._password);
    const response = await this.http.rpc(methodCall.xml);
    if (response.ok) {
      const xmlResponse = await response.text();
      return new AddressesMethodResponse(xmlResponse);
    } else {
      throw response.statusText;
    }
  }
  public async userImages(): Promise<Result<UserImagesMethodResponse>> {
    const methodCall = new UserImagesMethodCall(this._password);
    const response = await this.http.rpc(methodCall.xml);
    if (response.ok) {
      const xmlResponse = await response.text();
      const methodResponse = new UserImagesMethodResponse(xmlResponse);
      return Result.Ok(methodResponse);
    } else {
      return Result.Fail(response.statusText);
    }
  }
  public async saveImage(
    imageFilePath: string,
    imageRating = ImageRating.G
  ): Promise<Result<SaveImageUrlMethodResponse>> {
    if (!existsSync(imageFilePath)) {
      return Result.Fail(`file not found: ${imageFilePath}`);
    }
    const bitmap = readFileSync(imageFilePath);
    const imageData = Buffer.from(bitmap).toString("base64");
    const methodCall = new SaveDataMethodCall(
      imageData,
      imageRating,
      this._password
    );
    const response = await this.http.rpc(methodCall.xml);
    if (response.ok) {
      const xmlResponse = await response.text();
      const methodResponse = new SaveImageUrlMethodResponse(xmlResponse);
      return Result.Ok(methodResponse);
    } else {
      return Result.Fail(response.statusText);
    }
  }
  public async saveEncodedImage(
    base64String: string,
    imageRating = ImageRating.G
  ): Promise<Result<SaveImageUrlMethodResponse>> {
    const methodCall = new SaveDataMethodCall(
      base64String,
      imageRating,
      this._password
    );
    const response = await this.http.rpc(methodCall.xml);
    if (response.ok) {
      const xmlResponse = await response.text();
      const methodResponse = new SaveImageUrlMethodResponse(xmlResponse);
      return Result.Ok(methodResponse);
    } else {
      return Result.Fail(response.statusText);
    }
  }
  public async saveImageUrl(
    imageUrl: string,
    imageRating = ImageRating.G
  ): Promise<Result<SaveImageUrlMethodResponse>> {
    const methodCall = new SaveImageUrlMethodCall(
      imageUrl,
      imageRating,
      this._password
    );
    const response = await this.http.rpc(methodCall.xml);
    if (response.ok) {
      const xmlResponse = await response.text();
      const methodResponse = new SaveImageUrlMethodResponse(xmlResponse);
      return Result.Ok(methodResponse);
    } else {
      return Result.Fail(response.statusText);
    }
  }
  public async useUserImage(
    imageName: string,
    ...emailAddresses: string[]
  ): Promise<Result<UseUserImageMethodResponse>> {
    const addresses = emailAddresses.length ? emailAddresses : [this.email];
    const methodCall = new UseUserImageMethodCall(
      imageName,
      addresses,
      this._password
    );
    const response = await this.http.rpc(methodCall.xml);
    if (response.ok) {
      const xmlResponse = await response.text();
      const methodResponse = new UseUserImageMethodResponse(xmlResponse);
      return Result.Ok(methodResponse);
    } else {
      return Result.Fail(response.statusText);
    }
  }
  public async removeImage(
    ...emailAddresses: string[]
  ): Promise<Result<RemoveImageMethodResponse>> {
    const addresses = emailAddresses.length ? emailAddresses : [this.email];
    const methodCall = new RemoveImageMethodCall(addresses, this._password);
    const response = await this.http.rpc(methodCall.xml);
    if (response.ok) {
      const xmlResponse = await response.text();
      const methodResponse = new RemoveImageMethodResponse(xmlResponse);
      return Result.Ok(methodResponse);
    } else {
      return Result.Fail(response.statusText);
    }
  }
  public async deleteUserImage(
    imageName: string
  ): Promise<Result<DeleteUserImageMethodResponse>> {
    const methodCall = new DeleteUserImageMethodCall(imageName, this._password);
    const response = await this.http.rpc(methodCall.xml);
    if (response.ok) {
      const xmlResponse = await response.text();
      const methodResponse = new DeleteUserImageMethodResponse(xmlResponse);
      return Result.Ok(methodResponse);
    } else {
      return Result.Fail(response.statusText);
    }
  }
  public async test(): Promise<TestMethodResponse> {
    const methodCall = new TestMethodCall(this._password);
    const response = await this.http.rpc(methodCall.xml);
    if (response.ok) {
      const xmlResponse = await response.text();
      return new TestMethodResponse(xmlResponse);
    } else {
      throw response.statusText;
    }
  }
}
