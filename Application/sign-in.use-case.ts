import { UseCase } from './use-case.interface';

export class SignInUseCase implements UseCase<boolean> {

  public email: string;
  public password: string;

  constructor(){
    this.email = "";
    this.password = "";
  }
  
  execute(): Promise<boolean> {
    return Promise.resolve(true);
  }
}