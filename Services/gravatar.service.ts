import { Md5 } from 'ts-md5/dist/md5';
import { HttpShim } from '../Infrastructure/http-shim';
import { XmlService } from './xml.service';
import { ExistsMethodResponse } from '../Domain/exists.method-response';
import { Result } from '../Common/result';
import { TestMethodResponse } from '../Domain/test.method-response';

export class GravatarService {

  protected hash : string;
  protected origin : string = "https://secure.gravatar.com";
  protected endpoint : string;
  protected _password : string;

  public http: HttpShim;
  public xml: XmlService;

  constructor(public email: string,
              password: string) {
    const _email = `${email}`.trim().toLowerCase();
    this.hash = Md5.hashStr(_email).toString();
    this.endpoint = `${this.origin}/xmlrpc?user=${this.hash}`;
    this._password = password;
  }
  public async exists() : Promise<Result<ExistsMethodResponse>> {
    const message = this.xml.exists(this.hash, this._password);
    const response = await this.http.rpc(message);
    if(response.ok){
      const xml = await response.text();
      const methodResponse = new ExistsMethodResponse(xml)
      return Result.Ok<ExistsMethodResponse>(methodResponse)
    } else {
      return Result.Fail(response.statusText);
    }
  }
  public async test() : Promise<Result<TestMethodResponse>> {
    const message = this.xml.test(this._password);
    const response = await this.http.rpc(message);
    if(response.ok){
      const xml = await response.text();
      const methodResponse = new TestMethodResponse(xml)
      return Result.Ok<TestMethodResponse>(methodResponse)
    } else {
      return Result.Fail(response.statusText);
    }
  }
};
