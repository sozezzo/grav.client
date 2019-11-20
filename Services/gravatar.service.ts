import { Md5 } from 'ts-md5/dist/md5';
import { HttpShim } from '../Infrastructure/http-shim';
import { XmlService } from './xml.service';
import { xml2js } from 'xml-js';

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
  public async exists() : Promise<object> {
    const message = this.xml.exists(this.hash, this._password);
    const response = await this.http.rpc(message);
    // TODO: incorporate result class
    if(response.ok){
      const data = await response.text();
      return xml2js(data);
    } else {
      return {};
    }
  }
  public async test() : Promise<object> {
    const message = this.xml.test(this._password);
    const response = await this.http.rpc(message);
    if(response.ok){
      const data = await response.text();
      return xml2js(data);
    } else {
      return {};
    }
  }
};
