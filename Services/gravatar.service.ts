import { Md5 } from 'ts-md5/dist/md5';
import { HttpShim } from '../Infrastructure/http-shim';
import { RpcMessageFactory, RpcMessageTest, RpcMessageExists } from '../Domain/rpc-message-factory';
import { RpcMessageType } from '../Domain/rpc-message-type';
import { ExistsMethodResponse } from '../Domain/exists.method-response';
import { Result } from '../Common/result';
import { TestMethodResponse } from '../Domain/test.method-response';

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
    const message = <RpcMessageExists>RpcMessageFactory.get(RpcMessageType.EXISTS);
    let xmlReq = message.xml(this.emailHash, this._password);
    const response = await this.http.rpc(xmlReq);
    if(response.ok){
      const xmlRes = await response.text();
      const methodResponse = new ExistsMethodResponse(xmlRes);
      return Result.Ok<ExistsMethodResponse>(methodResponse);
    } else {
      return Result.Fail(response.statusText);
    }
  }
  public async test() : Promise<Result<TestMethodResponse>> {
    const message = <RpcMessageTest>RpcMessageFactory.get(RpcMessageType.TEST);
    let xmlReq = message.xml(this._password);
    const response = await this.http.rpc(xmlReq);
    if(response.ok){
      const xmlRes = await response.text();
      const methodResponse = new TestMethodResponse(xmlRes);
      return Result.Ok<TestMethodResponse>(methodResponse);
    } else {
      return Result.Fail(response.statusText);
    }
  }
};
