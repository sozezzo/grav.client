import { Md5 } from 'ts-md5/dist/md5';
import { HttpShim } from '../Infrastructure/http-shim';
import { ExistsMethodCall } from '../Domain/exists.method-call';
import { TestMethodCall } from '../Domain/test.method-call';
import { ExistsMethodResponse } from '../Domain/exists.method-response';
import { Result } from '../Common/result';
import { TestMethodResponse } from '../Domain/test.method-response';
import { AddressesMethodResponse } from '../Domain/addresses.method-response';

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
