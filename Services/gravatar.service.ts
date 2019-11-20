import { Md5 } from 'ts-md5/dist/md5';
import { HttpShim } from '../Infrastructure/http-shim';

export class GravatarService {

  protected hash : string | Int32Array;
  protected origin : string = "https://secure.gravatar.com";
  protected endpoint : string;
  protected _password : string;
  public http: HttpShim;

  constructor(public email: string,
              password: string) {
    const _email = `${email}`.trim().toLowerCase();
    this.hash = Md5.hashStr(_email);
    this.endpoint = `${this.origin}/xmlrpc?user=${this.hash}`;
    this._password = password;
  }
  test(): string {
    return this.hash.toString();
  }
};
