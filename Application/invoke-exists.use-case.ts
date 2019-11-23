import { UseCase } from './use-case.interface';
import { GravatarClient } from '../Presentation'
import { ExistsMethodResponse } from '../Domain/exists.method-response';
import { Result } from '../Common/result';

export class InvokeExistsUseCase implements UseCase<Result<ExistsMethodResponse>> {

  public client: GravatarClient;

  async execute(): Promise<Result<ExistsMethodResponse>> {
    return await this.client.exists();
  }

}