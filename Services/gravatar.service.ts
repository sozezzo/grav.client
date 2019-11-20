export class GravatarService {

  private hash : string;
  private endpoint : string;

  constructor(public email: string,
              public password: string) {
    this.hash = "";
    this.endpoint = "";     
  }

//   this.hash = crypto.createHash('md5')
//                   .update(email)
//                   .digest("hex");
// this.api_url = `${utils.api_origin}/xmlrpc?user=${this.hash}`;
// this.autoParse = false;

};
