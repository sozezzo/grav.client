import { GravatarService } from '../Services/gravatar.service';
import { HttpShim } from '../Infrastructure/http-shim';

export { ImageRating } from '../Domain/image-rating';

export class GravatarClient extends GravatarService {
  constructor(public email: string, password: string){
    super(email, password);
    this.http = new HttpShim(this.emailHash);
  }
}
