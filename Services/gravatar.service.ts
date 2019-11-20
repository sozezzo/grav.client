import { Md5 } from 'ts-md5/dist/md5';

export class GravatarService {

  protected hash : string | Int32Array;
  protected origin : string = "https://secure.gravatar.com";
  protected endpoint : string;

  constructor(public email: string,
              public password: string) {
    const _email = `${email}`.trim().toLowerCase();
    this.hash = Md5.hashStr(_email);
    this.endpoint = `${this.origin}/xmlrpc?user=${this.hash}`;
  }

};
