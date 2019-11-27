import * as fetchImport from 'isomorphic-unfetch';
import { createReadStream } from 'fs';
import FormData from 'isomorphic-form-data';

const fetch = (fetchImport.default || fetchImport) as typeof fetchImport.default;

export class HttpShim {
  public endpoint: string;

  constructor(emailHash: string){
    const origin = "https://secure.gravatar.com";
    this.endpoint = `${origin}/xmlrpc?user=${emailHash}`;
  }

  async rpc(message: string) : Promise<Response> {
    return await fetch(this.endpoint, {
      method: "POST",
      headers: { 'content-type' : 'text/xml' },
      body: message
    });
  }

  async postImageFile(imageFilePath: string) : Promise<Response> {
    const formData = new FormData();
    formData.append('avatar', createReadStream(imageFilePath));
    return await fetch('https://dailyavatar.io/api/v1/avatars', {
      method: "POST",
      body: <any>formData
    });
  }
}
