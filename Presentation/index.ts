import { GravatarService } from '../Services/gravatar.service';
import { HttpShim } from '../Infrastructure/http-shim';

export class GravatarClient extends GravatarService {
  constructor(public email: string, public password: string){
    super(email, password);
  }
  test(): string {
    return this.hash.toString();
  }
}
