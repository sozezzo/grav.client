import { GravatarService } from '../Services/gravatar.service';
export class Gravatar {
  
  private client : GravatarService;

  login(email: string, password: string) : GravatarService { 
    this.client = new GravatarService(email, password);
    return this.client;
  }

  test() : string {
    return "this is a test";
  }
}