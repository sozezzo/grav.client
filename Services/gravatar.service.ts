import { Md5 } from 'ts-md5/dist/md5';
import { HttpShim } from '../Infrastructure/http-shim';
import { Result } from '../Common/result';
import { ImageRating } from '../Domain/image-rating';

import {
  AddressesMethodCall, ExistsMethodCall, UserImagesMethodCall,
  SaveImageUrlMethodCall, DeleteUserImageMethodCall, TestMethodCall 
} from '../Domain/method-calls';

import {
  AddressesMethodResponse, ExistsMethodResponse, UserImagesMethodResponse,
  SaveImageUrlMethodResponse, DeleteUserImageMethodResponse, TestMethodResponse 
} from '../Domain/method-responses';

export class GravatarService {

  protected _password : string;
  public emailHash: string;
  public http: HttpShim;

  constructor(public email: string,
              password: string) {
    const _email = `${email}`.trim().toLowerCase();
    this.emailHash = Md5.hashStr(_email).toString();
    this._password = password;
  }
  public async exists() : Promise<Result<ExistsMethodResponse>> {
    const methodCall = new ExistsMethodCall(this.emailHash, this._password);
    const response = await this.http.rpc(methodCall.xml);
    if(response.ok){
      const xmlRes = await response.text();
      const methodResponse = new ExistsMethodResponse(xmlRes);
      return Result.Ok(methodResponse);
    } else {
      return Result.Fail(response.statusText);
    }
  }
  public async addresses() : Promise<Result<AddressesMethodResponse>> {
    const methodCall = new AddressesMethodCall(this._password);
    const response = await this.http.rpc(methodCall.xml);
    if(response.ok){
      const xmlRes = await response.text();
      const methodResponse = new AddressesMethodResponse(xmlRes);
      return Result.Ok(methodResponse);
    } else {
      return Result.Fail(response.statusText);
    }
  }
  public async userImages() : Promise<Result<UserImagesMethodResponse>> {
    const methodCall = new UserImagesMethodCall(this._password);
    const response = await this.http.rpc(methodCall.xml);
    if(response.ok){
      const xmlRes = await response.text();
      const methodResponse = new UserImagesMethodResponse(xmlRes);
      return Result.Ok(methodResponse);
    } else {
      return Result.Fail(response.statusText);
    }
  }
  public async saveImage(imageFilePath: string, imageRating = ImageRating.G): Promise<Result<SaveImageUrlMethodResponse>> {
    const response = await this.http.postImageFile(imageFilePath);
    if(response.ok){
      const imageUrl = await response.text();
      return this.saveImageUrl(imageUrl, imageRating);
    } else {
      return Result.Fail(response.statusText);
    }
  }
  public async saveImageUrl(imageUrl: string, imageRating = ImageRating.G) : Promise<Result<SaveImageUrlMethodResponse>> {
    const methodCall = new SaveImageUrlMethodCall(imageUrl, imageRating, this._password);
    const response = await this.http.rpc(methodCall.xml);
    if(response.ok){
      const xmlRes = await response.text();
      const methodResponse = new SaveImageUrlMethodResponse(xmlRes);
      return Result.Ok(methodResponse);
    } else {
      return Result.Fail(response.statusText);
    }
  }
  public async deleteUserImage(imageName: string) : Promise<Result<DeleteUserImageMethodResponse>> {
    const methodCall = new DeleteUserImageMethodCall(imageName, this._password);
    const response = await this.http.rpc(methodCall.xml);
    if(response.ok){
      const xmlRes = await response.text();
      const methodResponse = new DeleteUserImageMethodResponse(xmlRes);
      return Result.Ok(methodResponse);
    } else {
      return Result.Fail(response.statusText);
    }
  }
  public async test() : Promise<Result<TestMethodResponse>> {
    const methodCall = new TestMethodCall(this._password);
    const response = await this.http.rpc(methodCall.xml);
    if(response.ok){
      const xmlRes = await response.text();
      const methodResponse = new TestMethodResponse(xmlRes);
      return Result.Ok(methodResponse);
    } else {
      return Result.Fail(response.statusText);
    }
  }
};
