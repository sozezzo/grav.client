import { GravatarService } from '../Services/gravatar.service';
import { HttpShim } from '../Infrastructure/http-shim';
import { XmlService } from '../Services/xml.service';

export class GravatarClient extends GravatarService {
  constructor(public email: string, password: string){
    super(email, password);
    this.xml = new XmlService();
    this.http = new HttpShim();
    this.http.endpoint = this.endpoint;
  }
}
