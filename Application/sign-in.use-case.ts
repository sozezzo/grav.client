import { UseCase } from './use-case.interface';
import { GravatarService } from '../Services/gravatar.service';
export class SignInUseCase implements UseCase<GravatarService> {

  public email: string;
  public password: string;

  constructor(){
    this.email = "";
    this.password = "";
  }
  
  execute(): Promise<GravatarService> {
    const gravatarService = new GravatarService(this.email, this.password);
    return Promise.resolve(gravatarService);
  }
}