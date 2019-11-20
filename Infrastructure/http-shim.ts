import * as fetchImport from 'isomorphic-unfetch';

const fetch = (fetchImport.default || fetchImport) as typeof fetchImport.default;

export class HttpShim {
  public endpoint: string;
  async rpc(message: string) : Promise<Response> {
    return await fetch(this.endpoint, {
      method: "POST",
      headers: { 'content-type' : 'text/xml' },
      body:    message
    });
  }
}
