import { UseCase } from './use-case.interface';
import { GravatarService } from '../Services/gravatar.service';
import { ExistsMethodResponse } from '../Domain/exists.method-response';
import { Result } from '../Common/result';

export class InvokeExistsUseCase implements UseCase<Result<ExistsMethodResponse>> {

  public service: GravatarService;

  async execute(): Promise<Result<ExistsMethodResponse>> {
    return await this.service.exists();
  }

}