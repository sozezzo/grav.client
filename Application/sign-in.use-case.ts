import { UseCase } from './use-case.interface';
import { GravatarClient } from '../Presentation';
export class SignInUseCase implements UseCase<GravatarClient> {

  public email: string;
  public password: string;

  constructor(){
    this.email = "";
    this.password = "";
  }
  
  execute(): Promise<GravatarClient> {
    const gravatarService = new GravatarClient(this.email, this.password);
    return Promise.resolve(gravatarService);
  }
}